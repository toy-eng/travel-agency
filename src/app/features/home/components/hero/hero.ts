import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from '../../../../shared/motion/gsap';
import { prefersReducedMotion } from '../../../../shared/motion/prefers-reduced-motion';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly reduceMotion = prefersReducedMotion();
  private motionContext: gsap.Context | null = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion()) {
      return;
    }

    this.motionContext = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-eyebrow]', { y: 18, opacity: 0, duration: 0.55 })
        .from('[data-hero-headline]', { y: 34, opacity: 0, duration: 0.85 }, '-=0.3')
        .from('[data-hero-subtext]', { y: 22, opacity: 0, duration: 0.65 }, '-=0.55')
        .from('[data-hero-proof]', { y: 18, opacity: 0, duration: 0.55 }, '-=0.4')
        .from('[data-hero-builder]', { y: 42, opacity: 0, duration: 0.9 }, '-=0.45');
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
  }
}
