import { Component } from '@angular/core';
import { company, currentRole, yearsOfExperience } from '../data/experience';
import { profile } from '../data/profile';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  template: `
    <section id="home" class="hero" aria-labelledby="hero-title" tabindex="-1">
      <div class="container hero-inner">
        <div class="hero-top"><span class="eyebrow"><span class="status-dot"></span> {{ profile.title }}</span><span class="location"><app-icon name="pin" /> {{ company.location }}</span></div>
        <h1 id="hero-title">{{ firstName }}<br>{{ lastName }}<span class="hero-period">.</span></h1>
        <div class="hero-bottom">
          <div class="hero-copy">
            <p class="pitch">Building scalable systems and <span>AI-powered products.</span></p>
            <p class="currently">{{ years }} years shipping production software. Open to relocation.</p>
            <div class="hero-buttons">
              <a class="button button-primary" href="#projects">View Projects <app-icon name="arrowDown" /></a>
              <a class="button button-secondary" [href]="profile.resume" download>Download Resume <app-icon name="download" /></a>
            </div>
          </div>
          <div class="hero-aside">
            <span class="eyebrow aside-label">Currently</span>
            <span class="aside-value">{{ currentRole.title }}<br>at {{ company.name }}.</span>
            <div class="social-links">
              <a [href]="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)" title="GitHub"><app-icon name="github" /></a>
              <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)" title="LinkedIn"><app-icon name="linkedin" /></a>
              <a [href]="'mailto:' + profile.email" aria-label="Email Rashid" title="Email"><app-icon name="mail" /></a>
            </div>
          </div>
        </div>
        <div class="hero-footnote"><span class="eyebrow">Portfolio / {{ year }}</span><a href="#about" class="text-link">A little about me <app-icon name="arrowDown" /></a></div>
      </div>
    </section>
  `,
  styles: `
    .hero { background-image: radial-gradient(var(--grid) 0.7px, transparent 0.7px); background-size: 24px 24px; }
    .hero-inner { padding-top: 56px; padding-bottom: 24px; container-type: inline-size; }
    .hero-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .hero-top .eyebrow { color: var(--text); display: inline-flex; align-items: center; gap: 12px; }
    .location { font-family: var(--mono); font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
    h1 { font-size: clamp(4.5rem, 12cqi, 8rem); line-height: 0.98; margin: 32px 0; font-weight: 600; }
    .hero-period { color: var(--accent); }
    .hero-bottom { display: flex; justify-content: space-between; align-items: end; gap: 48px; }
    .hero-copy { max-width: 560px; }
    .pitch { font-size: 22px; line-height: 1.5; margin: 0; }
    .pitch span { color: var(--accent); }
    .currently { color: var(--muted); font-size: 12px; margin: 16px 0 24px; }
    .hero-buttons { display: flex; flex-wrap: wrap; gap: 12px; }
    .hero-aside { border-left: 1px solid var(--line); padding-left: 32px; min-width: 240px; }
    .aside-value { display: block; margin-top: 16px; font-size: 20px; line-height: 1.5; }
    .social-links { display: flex; gap: 12px; margin-top: 20px; }
    .social-links a { color: var(--muted); display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 4px; }
    .social-links a:hover { color: var(--accent); border-color: var(--accent); }
    .hero-footnote { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 20px; margin-top: 48px; }
    .hero-footnote .text-link { font-size: 12px; color: var(--muted); }
    @media (max-width: 767px) {
      .hero-inner { padding-top: 32px; }
      .hero-top { align-items: start; }
      .location { font-size: 10px; gap: 4px; }
      h1 { margin: 32px 0 24px; }
      .hero-bottom { display: block; }
      .pitch { font-size: 19px; }
      .currently { line-height: 1.8; }
      .hero-buttons { gap: 8px; }
      .hero-buttons .button { padding: 12px; font-size: 11px; }
      .hero-aside { padding: 0; border: 0; min-width: 0; margin-top: 32px; }
      .aside-value { font-size: 17px; }
      .social-links { margin-top: 24px; }
      .hero-footnote { margin-top: 32px; }
    }
  `,
})
export class Hero {
  readonly profile = profile;
  readonly company = company;
  readonly currentRole = currentRole;
  readonly years = yearsOfExperience();
  readonly year = new Date().getFullYear();
  private readonly nameParts = profile.name.split(' ');
  readonly firstName = this.nameParts[0];
  readonly lastName = this.nameParts.slice(1).join(' ');
}