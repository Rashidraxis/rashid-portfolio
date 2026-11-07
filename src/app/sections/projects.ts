import { Component, input } from '@angular/core';
import { Project, projects } from '../data/projects';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [Icon, RevealDirective],
  template: `
    <section id="projects" class="section" aria-labelledby="projects-title" tabindex="-1">
      <div class="container">
        <div class="section-heading" appReveal><span class="eyebrow"><span>03 /</span> Selected work</span><h2 id="projects-title">Ideas, shipped.</h2></div>
        @for (project of items(); track project.id; let index = $index) {
          <article class="project" [appReveal]="index">
            <div class="project-copy">
              <span class="eyebrow project-number">Project / {{ (index + 1).toString().padStart(2, '0') }}</span>
              <h3>{{ project.title }}</h3>
              <p class="project-summary">{{ project.summary }}</p>
              <p class="project-description">{{ project.description }}</p>
              <ul class="tags" aria-label="Technology stack">@for (tech of project.stack; track tech) { <li>{{ tech }}</li> }</ul>
              <div class="project-links">
                @if (project.repoUrl) { <a class="text-link" [href]="project.repoUrl" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'View ' + project.title + ' on GitHub (opens in new tab)'">View on GitHub <app-icon name="arrowUpRight" /></a> }
                @if (project.caseStudyUrl) { <a class="text-link" [href]="project.caseStudyUrl" target="_blank" rel="noopener noreferrer">Case study <app-icon name="arrowUpRight" /></a> }
              </div>
            </div>
            @if (project.image) {
              <figure class="project-visual"><img [src]="project.image" [alt]="project.title + ' application screenshot'" loading="lazy" decoding="async" width="1600" height="900"></figure>
            } @else if (project.title === 'StreamNest') {
              <div class="project-visual screenshot-placeholder" role="img" aria-label="StreamNest screenshot placeholder">
                <span class="visual-index" aria-hidden="true">01 / STREAMNEST</span>
                <div class="visual-center" aria-hidden="true"><app-icon name="code" /><span>StreamNest<span class="accent-period">.</span></span><small>VIDEO, WITHOUT LIMITS.</small></div>
                <span class="visual-caption" aria-hidden="true">Screenshot coming soon <span>16:9</span></span>
              </div>
            }
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .project { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; padding: 32px 0; border-block: 1px solid var(--line); transition: border-color 180ms; }
    .project + .project { border-top: 0; }
    .project:hover { border-color: var(--accent); }
    .project-number { font-size: 11px; color: var(--accent); }
    h3 { font-size: 36px; margin: 12px 0; }
    .project-summary { font-size: 17px; line-height: 1.6; margin: 0 0 16px; }
    .project-description { font-size: 13px; line-height: 1.8; color: var(--muted); margin: 0 0 24px; }
    .project-links { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 24px; font-size: 12px; }
    .project-visual { margin: 0; align-self: center; width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--line); border-radius: 4px; box-shadow: 0 8px 24px var(--shadow); overflow: hidden; }
    .project-visual img { width: 100%; height: 100%; object-fit: contain; background: var(--surface); }
    .screenshot-placeholder { background: var(--surface); display: flex; flex-direction: column; justify-content: space-between; padding: 20px; }
    .visual-index, .visual-caption, small { font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em; color: var(--muted); }
    .visual-center { display: flex; align-items: center; flex-direction: column; gap: 4px; }
    .visual-center app-icon { color: var(--accent); width: 28px; height: 28px; margin-bottom: 4px; }
    .visual-center > span { font-size: 30px; font-weight: 500; line-height: 1.4; }
    .accent-period { color: var(--accent); }
    .visual-caption { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 12px; }
    @media (max-width: 900px) { .project { grid-template-columns: 1fr; gap: 32px; } .project-visual { max-width: 700px; } }
    @media (max-width: 767px) { .project { padding: 24px 0; } h3 { font-size: 32px; } .screenshot-placeholder { padding: 16px; } .visual-center > span { font-size: 24px; } .visual-caption { padding-top: 8px; } }
  `,
})
export class Projects {
  readonly items = input<readonly Project[]>(projects);
}