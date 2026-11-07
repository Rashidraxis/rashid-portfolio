import { Component } from '@angular/core';
import { skillGroups } from '../data/skills';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section id="skills" class="section" aria-labelledby="skills-title" tabindex="-1">
      <div class="container">
        <div class="section-heading" appReveal><span class="eyebrow"><span>04 /</span> The toolkit</span><h2 id="skills-title">The right tools.<br>For the real problem.</h2></div>
        <div class="skills-grid">
          @for (group of groups; track group.category; let index = $index) {
            <div class="skill-group" [appReveal]="index % 2"><h3>{{ group.category }}</h3><ul class="tags">@for (skill of group.items; track skill) { <li>{{ skill }}</li> }</ul></div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 64px; }
    .skill-group { border-top: 1px solid var(--line); padding: 24px 0 32px; }
    h3 { font-size: 15px; margin-bottom: 16px; }
    @media (max-width: 767px) { .skills-grid { grid-template-columns: 1fr; } .skill-group { padding-bottom: 24px; } }
  `,
})
export class Skills {
  readonly groups = skillGroups;
}