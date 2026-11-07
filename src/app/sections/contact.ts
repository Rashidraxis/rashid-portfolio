import { Component } from '@angular/core';
import { profile } from '../data/profile';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [Icon, RevealDirective],
  template: `
    <section id="contact" class="section contact" aria-labelledby="contact-title" tabindex="-1">
      <div class="container" appReveal>
        <span class="eyebrow"><span class="status-dot"></span> Open to what's next</span>
        <div class="contact-heading"><h2 id="contact-title">Have something<br>in mind<span>?</span></h2><p>Let's build something that matters.<br>Based in Mumbai. Open to relocation.</p></div>
        <a class="contact-email text-link" [href]="'mailto:' + profile.email">{{ profile.email }} <app-icon name="arrowUpRight" /></a>
        <div class="contact-social"><a class="text-link" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <app-icon name="arrowUpRight" /></a><a class="text-link" [href]="profile.github" target="_blank" rel="noopener noreferrer">GitHub <app-icon name="arrowUpRight" /></a></div>
      </div>
    </section>
  `,
  styles: `
    .contact { background: var(--accent-soft); }
    .contact > .container > .eyebrow { display: flex; align-items: center; gap: 12px; }
    .contact-heading { display: flex; align-items: end; justify-content: space-between; gap: 40px; margin: 24px 0 32px; }
    h2 { font-size: 64px; line-height: 1.1; }
    h2 span { color: var(--accent); }
    .contact-heading p { color: var(--muted); font-size: 14px; margin: 0; }
    .contact-email { font-size: 26px; border-bottom: 1px solid var(--accent); padding-bottom: 8px; max-width: 100%; overflow-wrap: anywhere; }
    .contact-email app-icon { color: var(--accent); width: 24px; height: 24px; }
    .contact-social { display: flex; gap: 32px; margin-top: 32px; font: 12px/1.7 var(--mono); }
    @media (max-width: 767px) { .contact-heading { display: block; } h2 { font-size: 44px; } .contact-heading p { margin-top: 24px; } .contact-email { font-size: 17px; gap: 8px; } .contact-email app-icon { width: 18px; height: 18px; } }
  `,
})
export class Contact {
  readonly profile = profile;
}