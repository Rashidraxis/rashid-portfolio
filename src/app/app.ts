import { Component } from '@angular/core';
import { Header } from './header';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Experience } from './sections/experience';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';
import { Education } from './sections/education';
import { Contact } from './sections/contact';
import { Footer } from './sections/footer';

@Component({
  imports: [Header, Hero, About, Experience, Projects, Skills, Education, Contact, Footer],
  selector: 'app-root',
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-header />
    <main id="main" tabindex="-1">
      <app-hero /><app-about /><app-experience /><app-projects />
      <app-skills /><app-education /><app-contact />
    </main>
    <app-footer />
  `,
})
export class App {}
