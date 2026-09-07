import { AfterViewInit, Directive, ElementRef, OnDestroy, PLATFORM_ID, input, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollReveal]',
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  readonly delay = input(0, { alias: 'scrollRevealDelay' });

  private observer: IntersectionObserver | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal');

    if (this.delay() > 0) {
      element.classList.add(`scroll-reveal-delay-${this.delay()}`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
