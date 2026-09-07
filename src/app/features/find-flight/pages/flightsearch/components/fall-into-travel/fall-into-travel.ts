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
  selector: 'app-fall-into-travel',
  templateUrl: './fall-into-travel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallIntoTravelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fallSection', { read: ElementRef }) private sectionRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('fallHeader', { read: ElementRef }) private headerRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('featureCard', { read: ElementRef }) private featureRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('imageGrid', { read: ElementRef }) private imageGridRef:
    ElementRef<HTMLElement> | undefined;

  private readonly platformId = inject(PLATFORM_ID);
  private mm: ReturnType<typeof gsap.matchMedia> | undefined;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return;
    }

    const section = this.sectionRef?.nativeElement;
    const header = this.headerRef?.nativeElement;
    const feature = this.featureRef?.nativeElement;
    const imageGrid = this.imageGridRef?.nativeElement;
    if (!section || !header || !feature || !imageGrid) {
      return;
    }

    const tiles = Array.from(imageGrid.children) as HTMLElement[];

    this.mm = gsap.matchMedia();
    this.mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set([header, feature, ...tiles], { transition: 'none' });

      const reveal = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      reveal
        .fromTo(
          header,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            immediateRender: false,
            clearProps: 'transform,opacity,transition',
          },
          0,
        )
        .fromTo(
          feature,
          { opacity: 0, x: -36, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            immediateRender: false,
            clearProps: 'transform,opacity,transition',
          },
          0.1,
        )
        .fromTo(
          tiles,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            immediateRender: false,
            clearProps: 'transform,opacity,transition',
          },
          0.22,
        );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
