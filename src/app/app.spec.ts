import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { ThemeService } from './core/theme.service';
import { Projects } from './sections/projects';
import { projects } from './data/projects';
import { roles, yearsOfExperience } from './data/experience';
import { skillGroups } from './data/skills';
import { Header } from './header';

describe('Portfolio', () => {
  let systemLight: boolean;
  let preferenceListeners: Array<() => void>;

  beforeEach(() => {
    systemLight = false;
    preferenceListeners = [];
    localStorage.clear();
    vi.stubGlobal('matchMedia', (query: string) => ({
      get matches() { return query.includes('color-scheme') ? systemLight : query.includes('reduced-motion'); },
      media: query,
      addEventListener: (_event: string, listener: () => void) => {
        if (query.includes('color-scheme')) preferenceListeners.push(listener);
      },
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', class {
      observe = vi.fn();
      disconnect = vi.fn();
    });
    TestBed.configureTestingModule({ imports: [App, Projects, Header] });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function renderApp(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the name and all sections in the requested order', async () => {
    const page = await renderApp();
    expect(page.querySelector('h1')?.textContent).toContain('RashidFaruqui');
    expect([...page.querySelectorAll('main section')].map((section) => section.id)).toEqual(['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']);
    expect(page.querySelectorAll('h1')).toHaveLength(1);
  });

  it('provides a resume download and correct external link protections', async () => {
    const page = await renderApp();
    expect(page.querySelector('a[download]')?.getAttribute('href')).toBe('assets/Rashid_Faruqui_Resume.pdf');
    for (const link of page.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
    expect(page.querySelector('a[href="https://ude.my/UC-472e122c-30e5-4c9b-af2a-0518740ccd17"]')).not.toBeNull();
  });

  it('renders all eight skill groups and every supplied skill', async () => {
    const page = await renderApp();
    expect(page.querySelectorAll('.skill-group')).toHaveLength(8);
    const rendered = [...page.querySelectorAll('.skill-group li')].map((item) => item.textContent?.trim());
    expect(rendered).toEqual(skillGroups.flatMap((group) => [...group.items]));
  });

  it('includes the experience stat without progress bars or a contact form', async () => {
    const page = await renderApp();
    expect(page.querySelector('.impact-stat strong')?.textContent).toBe('99%');
    expect(page.querySelectorAll('form, iframe, progress, [role="progressbar"]')).toHaveLength(0);
  });

  it('renders the timeline from the experience data file', async () => {
    const page = await renderApp();
    expect(page.querySelectorAll('#experience .role')).toHaveLength(roles.length);
    expect([...page.querySelectorAll('#experience .role h3')].map((heading) => heading.textContent)).toEqual(roles.map((role) => role.title));
    expect(page.querySelectorAll('#experience .current-badge')).toHaveLength(1);
  });

  it('derives the years of experience from the start date', async () => {
    expect(yearsOfExperience(new Date('2026-10-31'))).toBe(3);
    expect(yearsOfExperience(new Date('2027-10-31'))).toBe(4);
    const page = await renderApp();
    expect(page.querySelector('.experience-mark strong')?.textContent).toContain(String(yearsOfExperience()));
  });

  it('shows the StreamNest placeholder and repo without absent optional links', async () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.componentRef.setInput('items', [projects[0]]);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.screenshot-placeholder')).not.toBeNull();
    expect(page.querySelector('.project-visual img')).toBeNull();
    expect(page.querySelectorAll('.project-links a')).toHaveLength(1);
    expect(page.textContent).not.toContain('Live Demo');
  });

  it('renders an optional lazy screenshot and case study without requiring a repo', async () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.componentRef.setInput('items', [{ ...projects[0], repoUrl: undefined, image: 'assets/streamnest.webp', caseStudyUrl: 'https://example.com/case-study' }]);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('img')?.getAttribute('loading')).toBe('lazy');
    expect(page.querySelector('img')?.getAttribute('alt')).toBe('StreamNest application screenshot');
    expect(page.querySelector('.screenshot-placeholder')).toBeNull();
    expect(page.querySelectorAll('.project-links a')).toHaveLength(1);
    expect(page.textContent).toContain('Case study');
  });

  it('does not invent media or demo links for another minimal project', async () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.componentRef.setInput('items', [{ id: '02', title: 'Example', summary: 'Summary', description: 'Description', stack: [], demoUrl: 'https://example.com' }]);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('.project-visual, .project-links a, iframe')).toHaveLength(0);
  });

  it('defaults to dark when the system prefers dark', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('uses light when the system prefers light', () => {
    systemLight = true;
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('honors a saved choice ahead of system preference', () => {
    localStorage.setItem('portfolio-theme', 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('ignores invalid stored values and follows system changes until toggled', () => {
    localStorage.setItem('portfolio-theme', 'invalid');
    const theme = TestBed.inject(ThemeService);
    expect(theme.theme()).toBe('dark');
    systemLight = true;
    preferenceListeners.forEach((listener) => listener());
    expect(theme.theme()).toBe('light');
    theme.toggle();
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    preferenceListeners.forEach((listener) => listener());
    expect(theme.theme()).toBe('dark');
  });

  it('remains usable when localStorage reads and writes are blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Blocked', 'SecurityError'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Blocked', 'SecurityError'); });
    const theme = TestBed.inject(ThemeService);
    expect(() => theme.toggle()).not.toThrow();
    expect(theme.theme()).toBe('light');
  });

  it('opens the menu and closes it with Escape', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('.menu-toggle')!;
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes mobile navigation after selecting a section', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    fixture.componentInstance.menuOpen.set(true);
    fixture.componentInstance.navigate('projects');
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(fixture.componentInstance.activeSection()).toBe('projects');
    expect((fixture.nativeElement as HTMLElement).querySelector('[aria-current="location"]')?.getAttribute('href')).toBe('#projects');
  });
});
