import { Component } from '@angular/core';
import { company, roles } from '../data/experience';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section id="experience" class="section" aria-labelledby="experience-title" tabindex="-1">
      <div class="container">
        <div class="section-heading" appReveal><span class="eyebrow"><span>02 /</span> Experience</span><h2 id="experience-title">Making things work.<br>Then making them better.</h2></div>
        <div class="experience-layout">
          <div class="company" appReveal><strong>{{ company.name }}<span>.</span></strong><span class="eyebrow">{{ company.location }}</span></div>
          <div class="timeline">
            @for (role of roles; track role.id; let index = $index) {
              <article class="role" [appReveal]="index">
                <div class="role-heading"><h3>{{ role.title }}</h3>@if (role.current) { <span class="current-badge">Current</span> }</div>
                <p class="role-date">{{ role.period }}</p>
                <ul class="achievements">
                  @for (achievement of role.achievements; track achievement.text) {
                    <li [class.impact]="achievement.stat">
                      @if (achievement.stat; as stat) {
                        <p>{{ achievement.text }}</p>
                        <div class="impact-stat"><strong>{{ stat.value }}<span>{{ stat.unit }}</span></strong><span class="eyebrow">{{ stat.label }}</span></div>
                      } @else {
                        {{ achievement.text }}
                      }
                    </li>
                  }
                </ul>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .experience-layout { display: grid; grid-template-columns: 200px 1fr; gap: 48px; }
    .company strong { display: block; font-size: 40px; font-weight: 500; line-height: 1.2; }
    .company strong span { color: var(--accent); }
    .company > span { display: block; margin-top: 12px; }
    .timeline { border-left: 1px solid var(--line); padding-left: 32px; }
    .role { position: relative; padding-bottom: 40px; }
    .role:last-child { padding-bottom: 0; }
    .role::before { content: ''; position: absolute; top: 8px; left: -37px; width: 9px; height: 9px; background: var(--bg); border: 1px solid var(--muted); border-radius: 50%; }
    .role:first-child::before { background: var(--accent); border-color: var(--accent); }
    .role-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    h3 { font-size: 21px; }
    .current-badge { font-family: var(--mono); color: var(--accent); font-size: 11px; letter-spacing: 0.04em; border: 1px solid var(--line); padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
    .role-date { font: 11px/1.7 var(--mono); color: var(--muted); margin: 8px 0 24px; }
    .achievements { padding-left: 16px; margin: 0; color: var(--muted); font-size: 14px; }
    .achievements li { padding-left: 4px; margin-top: 16px; }
    li::marker { color: var(--accent); }
    .achievements .impact { display: grid; grid-template-columns: 1fr 152px; gap: 24px; border-block: 1px solid var(--line); padding: 24px 0; margin: 0 0 24px -16px; }
    .impact p { margin: 0; }
    .impact-stat { border-left: 1px solid var(--line); padding-left: 24px; align-self: center; }
    .impact-stat strong { font-size: 64px; line-height: 1; font-weight: 500; color: var(--accent); }
    .impact-stat strong span { font-size: 32px; }
    .impact-stat > span { display: block; font-size: 10px; margin-top: 8px; }
    @media (max-width: 767px) { .experience-layout { grid-template-columns: 1fr; gap: 32px; } .timeline { padding-left: 24px; } .role::before { left: -29px; } h3 { font-size: 18px; } .role-heading { align-items: start; } .achievements .impact { grid-template-columns: 1fr; gap: 16px; } .impact-stat { border-left: 0; padding-left: 0; } }
  `,
})
export class Experience {
  readonly company = company;
  readonly roles = roles;
}