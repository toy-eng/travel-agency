import { NgOptimizedImage } from '@angular/common';
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
  selector: 'app-go-places',
  imports: [NgOptimizedImage],
  templateUrl: './go-places.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoPlacesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('goSection', { read: ElementRef }) private sectionRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('goHeading', { read: ElementRef }) private headingRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('mapWrap', { read: ElementRef }) private mapWrapRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('mapImage', { read: ElementRef }) private mapImageRef:
    ElementRef<HTMLElement> | undefined;

  private readonly platformId = inject(PLATFORM_ID);
  private mm: ReturnType<typeof gsap.matchMedia> | undefined;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return;
    }

    const section = this.sectionRef?.nativeElement;
    const heading = this.headingRef?.nativeElement;
    const mapWrap = this.mapWrapRef?.nativeElement;
    const mapImage = this.mapImageRef?.nativeElement;
    if (!section || !heading || !mapWrap || !mapImage) {
      return;
    }

    this.mm = gsap.matchMedia();
    this.mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set([heading, mapWrap, mapImage], { transition: 'none' });

      const reveal = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
      });
      reveal
        .fromTo(
          heading,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, clearProps: 'transform,opacity,transition' },
          0,
        )
        .fromTo(
          mapWrap,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.65, clearProps: 'transform,opacity,transition' },
          0.12,
        );

      // Scrub-parallax on the map while it scrolls through the viewport.
      gsap.fromTo(
        mapImage,
        { yPercent: -5, scale: 1.1 },
        {
          yPercent: 5,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
