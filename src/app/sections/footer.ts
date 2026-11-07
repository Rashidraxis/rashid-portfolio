import { Component } from '@angular/core';
import { profile } from '../data/profile';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  template: `<footer class="container footer"><span>&copy; {{ year }} Rashid Faruqui</span><a class="text-link" [href]="profile.portfolioRepository" target="_blank" rel="noopener noreferrer">Built with Angular <app-icon name="arrowUpRight" /></a><a class="text-link" href="#home">Back to top <app-icon name="arrowUpRight" /></a></footer>`,
  styles: `.footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-block: 24px; color: var(--muted); font: 11px/1.7 var(--mono); letter-spacing: 0.04em; } @media (max-width: 767px) { .footer { flex-wrap: wrap; } .footer > span { flex-basis: 100%; } }`,
})
export class Footer {
  readonly profile = profile;
  readonly year = new Date().getFullYear();
}