import { Component } from '@angular/core';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-education',
  imports: [Icon, RevealDirective],
  template: `
    <section id="education" class="section" aria-labelledby="education-title" tabindex="-1">
      <div class="container">
        <div class="section-heading" appReveal><span class="eyebrow"><span>05 /</span> Always learning</span><h2 id="education-title">Foundations &amp;<br>new frontiers.</h2></div>
        <div class="education-grid">
          <article appReveal><span class="eyebrow">Education / 2019 - 2023</span><h3>B.E. in Computer Science</h3><p>Shivajirao S. Jondhale College of Engineering</p><span class="credential-detail">CGPA <strong>8.13 / 10</strong></span></article>
          <article [appReveal]="1"><span class="eyebrow">Certification / Oct 2026</span><h3><a href="https://ude.my/UC-472e122c-30e5-4c9b-af2a-0518740ccd17" target="_blank" rel="noopener noreferrer" class="text-link">AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents <app-icon name="arrowUpRight" /></a></h3><p>Udemy</p><span class="credential-detail">LLM engineering &amp; applied AI</span></article>
        </div>
      </div>
    </section>
  `,
  styles: `
    .education-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
    article { border-top: 1px solid var(--line); padding-top: 24px; }
    h3 { font-size: 21px; margin: 16px 0; }
    h3 a { align-items: start; }
    h3 app-icon { margin-top: 6px; }
    p { color: var(--muted); font-size: 13px; margin: 0 0 16px; }
    .credential-detail { font: 11px/1.8 var(--mono); letter-spacing: 0.04em; color: var(--muted); }
    .credential-detail strong { color: var(--accent); font-weight: 400; }
    @media (max-width: 767px) { .education-grid { grid-template-columns: 1fr; gap: 32px; } }
  `,
})
export class Education {}