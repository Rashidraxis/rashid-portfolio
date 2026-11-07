import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { ThemeService } from './core/theme.service';
import { Icon } from './shared/icon';

@Component({
  selector: 'app-header',
  imports: [Icon],
  host: { '(document:keydown.escape)': 'closeMenu(true)', '(document:click)': 'onOutsideClick($event)' },
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="wordmark" href="#home" aria-label="Rashid Faruqui, home" (click)="closeMenu()">rf<span>.</span></a>
        <nav id="primary-navigation" aria-label="Main navigation" [class.is-open]="menuOpen()">
          @for (item of navigation; track item.id) {
            <a [href]="'#' + item.id" [attr.aria-current]="activeSection() === item.id ? 'location' : null" (click)="navigate(item.id)">{{ item.label }}</a>
          }
        </nav>
        <div class="header-actions">
          <span class="availability"><span class="status-dot"></span> Open to opportunities</span>
          <button class="icon-button" type="button" (click)="theme.toggle()" [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'" [title]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
          </button>
          <button class="icon-button menu-toggle" type="button" aria-controls="primary-navigation" [attr.aria-expanded]="menuOpen()" [attr.aria-label]="menuOpen() ? 'Close navigation' : 'Open navigation'" (click)="menuOpen.set(!menuOpen())">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 20; }
    .site-header { background: var(--bg); border-bottom: 1px solid var(--line); }
    .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 80px; }
    .wordmark { font-size: 32px; font-weight: 700; text-decoration: none; line-height: 1; }
    .wordmark span { color: var(--accent); }
    nav { display: flex; gap: 28px; }
    nav a { color: var(--muted); font-size: 13px; text-decoration: none; position: relative; padding: 12px 0; }
    nav a::after { content: ''; position: absolute; bottom: 3px; left: 0; right: 0; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 180ms; }
    nav a:hover, nav a[aria-current] { color: var(--text); }
    nav a[aria-current]::after, nav a:hover::after { transform: scaleX(1); }
    .header-actions { display: flex; align-items: center; gap: 16px; }
    .availability { font-family: var(--mono); color: var(--muted); font-size: 11px; letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px; }
    .menu-toggle { display: none; }
    @media (max-width: 1100px) { .availability { display: none; } }
    @media (max-width: 767px) {
      .header-inner { height: 72px; }
      .header-actions { gap: 8px; }
      .menu-toggle { display: inline-flex; }
      nav { display: none; position: absolute; top: 72px; left: 0; right: 0; background: var(--bg); padding: 16px 24px 24px; border-bottom: 1px solid var(--line); }
      nav.is-open { display: grid; gap: 0; }
      nav a { padding: 12px 8px; font-size: 16px; }
      nav a::after { right: auto; width: 24px; }
    }
  `,
})
export class Header {
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);
  readonly activeSection = signal('home');
  readonly navigation = [
    { id: 'about', label: 'About' }, { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }, { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' }, { id: 'contact', label: 'Contact' },
  ];
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
      const updateActive = () => {
        const current = sections.filter((section) => section.getBoundingClientRect().top <= 180).at(-1);
        this.activeSection.set(current?.id ?? 'home');
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) this.activeSection.set('contact');
      };
      const observer = new IntersectionObserver(updateActive, { rootMargin: '-80px 0px -65% 0px', threshold: [0, 1] });
      sections.forEach((section) => observer.observe(section));
      window.addEventListener('scroll', updateActive, { passive: true });
      const breakpoint = window.matchMedia('(min-width: 768px)');
      const closeOnDesktop = () => { if (breakpoint.matches) this.closeMenu(); };
      breakpoint.addEventListener('change', closeOnDesktop);
      updateActive();
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', updateActive);
        breakpoint.removeEventListener('change', closeOnDesktop);
      });
    });
  }

  navigate(id: string): void {
    this.closeMenu();
    this.activeSection.set(id);
    document.getElementById(id)?.focus({ preventScroll: true });
  }

  closeMenu(restoreFocus = false): void {
    if (restoreFocus && this.menuOpen()) this.host.nativeElement.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
    this.menuOpen.set(false);
  }

  onOutsideClick(event: Event): void {
    if (event.target instanceof Node && !this.host.nativeElement.contains(event.target)) this.closeMenu();
  }
}