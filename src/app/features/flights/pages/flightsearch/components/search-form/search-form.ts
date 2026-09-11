import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FloatingFieldComponent } from '../../../../../../shared/components/floating-field/floating-field';
import { quickSwap } from '../../../../../../shared/animations/transitions';
import { gsap } from '../../../../../../shared/motion/gsap';

@Component({
  selector: 'app-flightsearch-form',
  imports: [FormsModule, RouterLink, FloatingFieldComponent],
  animations: [quickSwap],
  templateUrl: './search-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsearchFormComponent implements AfterViewInit, OnDestroy {
  readonly fromLocation = signal('Lahore');
  readonly toLocation = signal('Karachi');
  readonly tripType = signal('Return');
  readonly departReturn = signal('07 Nov 22 - 13 Nov 22');
  readonly passengerClass = signal('1 Passenger, Economy');

  readonly showPromoInput = signal(false);
  readonly promoCode = signal('');
  readonly appliedPromo = signal<string | null>(null);

  @ViewChild('searchCard', { read: ElementRef }) private searchCard:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('fieldGrid', { read: ElementRef }) private fieldGrid:
    ElementRef<HTMLElement> | undefined;
  @ViewChild('formActions', { read: ElementRef }) private formActions:
    ElementRef<HTMLElement> | undefined;

  private readonly platformId = inject(PLATFORM_ID);
  private mm: ReturnType<typeof gsap.matchMedia> | undefined;

  swapLocations() {
    const temp = this.fromLocation();
    this.fromLocation.set(this.toLocation());
    this.toLocation.set(temp);
  }

  togglePromo() {
    this.showPromoInput.update((v) => !v);
  }

  applyPromo() {
    if (this.promoCode().trim()) {
      this.appliedPromo.set(this.promoCode().trim().toUpperCase());
      this.showPromoInput.set(false);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return;
    }

    const card = this.searchCard?.nativeElement;
    const grid = this.fieldGrid?.nativeElement;
    const actions = this.formActions?.nativeElement;
    if (!card || !grid || !actions) {
      return;
    }

    const fields = Array.from(grid.querySelectorAll<HTMLElement>('app-floating-field'));

    this.mm = gsap.matchMedia();
    this.mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set([card, ...fields, actions], { transition: 'none' });

      // Staggered page-intro: card first, then fields, then the primary CTA row.
      const intro = gsap.timeline({ delay: 0.45, defaults: { ease: 'power3.out' } });
      intro
        .fromTo(
          card,
          { opacity: 0, y: 44, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, clearProps: 'transform,opacity,transition' },
          0,
        )
        .fromTo(
          fields,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            clearProps: 'transform,opacity,transition',
          },
          0.35,
        )
        .fromTo(
          actions,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, clearProps: 'transform,opacity,transition' },
          0.6,
        );

      // Pointer-tracked mint spotlight across the card.
      const onPointerMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };
      const onEnter = () => card.classList.add('spotlight-active');
      const onLeave = () => card.classList.remove('spotlight-active');

      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointerleave', onLeave);

      return () => {
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerenter', onEnter);
        card.removeEventListener('pointerleave', onLeave);
      };
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}
