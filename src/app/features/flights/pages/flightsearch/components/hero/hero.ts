import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { gsap } from '../../../../../../shared/motion/gsap';

@Component({
  selector: 'app-flightsearch-hero',
  template: `
    <section #heroSection class="relative overflow-hidden">
      <div
        #heroBg
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/findFlightHero.jpg')"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50"
        aria-hidden="true"
      ></div>
      <div class="relative z-10 mx-auto max-w-[1240px] px-4 pb-44 pt-8 sm:px-6 sm:pb-52 sm:pt-10">
        <h1
          #heroTitle
          class="max-w-2xl text-4xl font-display font-extrabold leading-[1.08] text-white drop-shadow-md sm:text-5xl lg:text-[56px]"
        >
          Make your travel<br class="hidden sm:block" />wishlist, we&rsquo;ll do<br
            class="hidden sm:block"
          />the rest
        </h1>
        <p #heroSubtitle class="mt-5 text-lg font-sans font-semibold text-white/90 sm:text-xl">
          Special offers to suit your plan
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsearchHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection', { read: ElementRef }) private heroSection:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('heroBg', { read: ElementRef }) private heroBg: ElementRef<HTMLElement> | undefined;
  @ViewChild('heroTitle', { read: ElementRef }) private heroTitle:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('heroSubtitle', { read: ElementRef }) private heroSubtitle:
    ElementRef<HTMLElement> | undefined;

  private readonly platformId = inject(PLATFORM_ID);
  private mm: ReturnType<typeof gsap.matchMedia> | undefined;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return;
    }

    const section = this.heroSection?.nativeElement;
    const bg = this.heroBg?.nativeElement;
    const title = this.heroTitle?.nativeElement;
    const subtitle = this.heroSubtitle?.nativeElement;
    if (!section || !bg || !title || !subtitle) {
      return;
    }

    this.mm = gsap.matchMedia();
    this.mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Keep the global CSS transition layer from fighting GSAP's per-frame writes.
      gsap.set([bg, title, subtitle], { transition: 'none' });

      const intro = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });
      intro
        .fromTo(bg, { scale: 1.06 }, { scale: 1.18, duration: 16, ease: 'none' }, 0)
        .fromTo(
          title,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.9, clearProps: 'transform,opacity,transition' },
          0.15,
        )
        .fromTo(
          subtitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: 'transform,opacity,transition' },
          0.34,
        );

      // Subtle pointer parallax; safe inside the scale headroom created by the Ken Burns tween.
      const xTo = gsap.quickTo(bg, 'xPercent', { duration: 1.2, ease: 'power2.out' });
      const yTo = gsap.quickTo(bg, 'yPercent', { duration: 1.2, ease: 'power2.out' });
      const onPointerMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(x * -3);
        yTo(y * -2);
      };

      section.addEventListener('pointermove', onPointerMove, { passive: true });

      return () => {
        section.removeEventListener('pointermove', onPointerMove);
        xTo.tween?.kill();
        yTo.tween?.kill();
      };
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
