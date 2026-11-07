import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  readonly appReveal = input(0, { transform: (value: unknown) => numberAttribute(value, 0) });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const target = this.element.nativeElement;
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      target.style.setProperty('--reveal-delay', `${this.appReveal() * 60}ms`);
      target.classList.add('reveal-pending');
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          target.classList.remove('reveal-pending');
          observer.disconnect();
        }
      }, { threshold: 0.08 });
      observer.observe(target);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}