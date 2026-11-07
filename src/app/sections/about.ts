import { Component } from '@angular/core';
import { yearsOfExperience } from '../data/experience';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  template: `
    <section id="about" class="section" aria-labelledby="about-title" tabindex="-1">
      <div class="container" appReveal>
        <div class="section-heading"><span class="eyebrow"><span>01 /</span> About</span><h2 id="about-title">Built on curiosity.<br>Backed by experience.</h2></div>
        <div class="about-body">
          <div class="experience-mark"><strong>{{ years }}<span> years</span></strong><span class="eyebrow">Building in production</span></div>
          <div class="about-copy"><p>{{ years }} years of production experience building and scaling systems on <strong>Node.js, Angular, Express, and PostgreSQL.</strong></p><p>I use AI-assisted development tools in my daily workflow and have completed the AI Engineer Core Track covering <strong>LLM engineering, RAG, QLoRA fine-tuning, and agents.</strong></p></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-body { display: grid; grid-template-columns: 200px 1fr; gap: 48px; }
    .experience-mark strong { display: block; font-size: 56px; font-weight: 500; line-height: 1.1; }
    .experience-mark strong span { font-size: 20px; color: var(--muted); }
    .experience-mark > span { display: block; margin-top: 12px; }
    .about-copy { max-width: 680px; font-size: 18px; color: var(--muted); }
    p { margin: 0 0 16px; }
    p:last-child { margin-bottom: 0; }
    .about-copy strong { color: var(--text); font-weight: 400; }
    @media (max-width: 767px) { .about-body { grid-template-columns: 1fr; gap: 24px; } .about-copy { font-size: 16px; } }
  `,
})
export class About {
  readonly years = yearsOfExperience();
}