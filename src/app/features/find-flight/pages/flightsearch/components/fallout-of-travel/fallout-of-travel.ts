import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { gsap } from '../../../../../../shared/motion/gsap';

interface FalloutDestination {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

@Component({
  selector: 'app-fallout-of-travel',
  imports: [NgOptimizedImage],
  templateUrl: './fallout-of-travel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FalloutOfTravelComponent implements AfterViewInit, OnDestroy {
  readonly destinations: FalloutDestination[] = [
    {
      name: 'Melbourne',
      description: 'An amazing journey',
      price: '$700',
      imageUrl:
        'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=900&q=85',
    },
    {
      name: 'Paris',
      description: 'A Paris Adventure',
      price: '$600',
      imageUrl:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85',
    },
    {
      name: 'London',
      description: 'London eye adventure',
      price: '$350',
      imageUrl:
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85',
    },
    {
      name: 'Columbia',
      description: 'Amazing streets',
      price: '$700',
      imageUrl:
        'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85',
    },
  ];

  @ViewChild('cardsSection', { read: ElementRef }) private sectionRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('cardsHeader', { read: ElementRef }) private headerRef:
    ElementRef<HTMLElement> | undefined;
  @ViewChildren('cardItem', { read: ElementRef }) private cardItems:
    QueryList<ElementRef<HTMLElement>> | undefined;

  private readonly platformId = inject(PLATFORM_ID);
  private mm: ReturnType<typeof gsap.matchMedia> | undefined;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return;
    }

    const section = this.sectionRef?.nativeElement;
    const header = this.headerRef?.nativeElement;
    const cards = this.cardItems?.toArray().map((item) => item.nativeElement) ?? [];
    if (!section || !header || cards.length === 0) {
      return;
    }

    this.mm = gsap.matchMedia();
    this.mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set([header, ...cards], { transition: 'none' });

      const reveal = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
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
          cards,
          { opacity: 0, y: 48, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.09,
            immediateRender: false,
            clearProps: 'transform,opacity,transition',
          },
          0.1,
        );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
