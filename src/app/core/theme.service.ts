import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  // matchMedia is absent while prerendering, so the server render keeps the default dark theme.
  private readonly preference = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: light)');
  private manual = false;
  readonly theme = signal<Theme>('dark');

  constructor() {
    let stored: string | null = null;
    try {
      stored = this.document.defaultView?.localStorage.getItem('portfolio-theme') ?? null;
    } catch {}
    this.manual = stored === 'dark' || stored === 'light';
    this.apply(this.manual ? stored as Theme : this.systemTheme());
    const onChange = () => {
      if (!this.manual) this.apply(this.systemTheme());
    };
    this.preference?.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => this.preference?.removeEventListener('change', onChange));
  }

  toggle(): void {
    this.manual = true;
    this.apply(this.theme() === 'dark' ? 'light' : 'dark');
    try {
      this.document.defaultView?.localStorage.setItem('portfolio-theme', this.theme());
    } catch {}
  }

  private systemTheme(): Theme {
    return this.preference?.matches ? 'light' : 'dark';
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0d10' : '#faf8f4');
  }
}