import { Component, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, CodeXml, Download, Mail, MapPin, Menu, Moon, Sun, X } from 'lucide';

const icons = { arrowDown: ArrowDown, arrowRight: ArrowRight, arrowUpRight: ArrowUpRight, code: CodeXml, download: Download, github: CodeXml, linkedin: BriefcaseBusiness, mail: Mail, pin: MapPin, menu: Menu, moon: Moon, sun: Sun, close: X };
const svgNamespace = 'http://www.w3.org/2000/svg';
const svgAttributes: Record<string, string> = { viewBox: '0 0 24 24', width: '100%', height: '100%', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', focusable: 'false' };

@Component({
  selector: 'app-icon',
  template: '',
  // Icons are built imperatively, so hydration re-creates them instead of matching nodes.
  host: { 'aria-hidden': 'true', ngSkipHydration: 'true' },
  styles: ':host { display: inline-flex; width: 1.125rem; height: 1.125rem; flex-shrink: 0; }',
})
export class Icon {
  readonly name = input.required<keyof typeof icons>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const host = this.element.nativeElement;
      const svg = this.renderer.createElement('svg', svgNamespace);
      for (const [key, value] of Object.entries(svgAttributes)) this.renderer.setAttribute(svg, key, value);
      for (const [tag, attributes] of icons[this.name()]) {
        const child = this.renderer.createElement(tag, svgNamespace);
        for (const [key, value] of Object.entries(attributes)) {
          if (value !== undefined) this.renderer.setAttribute(child, key, String(value));
        }
        this.renderer.appendChild(svg, child);
      }
      while (host.firstChild) this.renderer.removeChild(host, host.firstChild);
      this.renderer.appendChild(host, svg);
    });
  }
}