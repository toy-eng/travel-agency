import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TripPlannerService } from '../../core/services/trip-planner/trip-planner';
import { gsap, ScrollTrigger } from '../../shared/motion/gsap';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';
import { attractions, curatedRoutes, howItWorksSteps, travelerReviews } from './home.data';
import type { Attraction, CuratedRoute } from './home.models';
import { AttractionsComponent } from './components/attractions/attractions';
import { CuratedRoutesComponent } from './components/curated-routes/curated-routes';
import { HeroComponent } from './components/hero/hero';
import { JourneyBuilderComponent } from './components/journey-builder/journey-builder';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    JourneyBuilderComponent,
    CuratedRoutesComponent,
    AttractionsComponent,
    ReviewsSectionComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reduceMotion = prefersReducedMotion();
  private readonly tripPlanner = inject(TripPlannerService);
  private readonly journeyBuilderShell = viewChild<ElementRef<HTMLElement>>('journeyBuilderShell');
  private readonly journeyBuilder = viewChild(JourneyBuilderComponent);

  private motionContext: gsap.Context | null = null;
  private feedbackTimer: ReturnType<typeof setTimeout> | null = null;

  readonly curatedRoutes = curatedRoutes;
  readonly attractions = attractions;
  readonly howItWorksSteps = howItWorksSteps;
  readonly reviews = travelerReviews;

  readonly selectedAttractionIds = signal<ReadonlySet<string>>(new Set<string>());
  readonly tripFeedback = signal<string | null>(null);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion()) {
      return;
    }

    this.motionContext = gsap.context(() => {
      const hostElement = this.host.nativeElement as HTMLElement;
      const revealGroups = hostElement.querySelectorAll<HTMLElement>('[data-reveal-group]');

      revealGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
        if (!items.length) {
          return;
        }

        gsap.from(items, {
          y: 34,
          opacity: 0,
          duration: 0.72,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 82%',
            once: true,
          },
        });
      });
    }, this.host.nativeElement);

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  useCuratedRoute(route: CuratedRoute): void {
    this.journeyBuilder()?.applyRoute(route);
    this.showFeedback(`${route.title} loaded into your journey builder.`);

    const builder = this.journeyBuilderShell()?.nativeElement;
    if (builder) {
      builder.scrollIntoView({
        behavior: this.reduceMotion() ? 'auto' : 'smooth',
        block: 'center',
      });
    }
  }

  toggleAttraction(attraction: Attraction): void {
    const selected = new Set(this.selectedAttractionIds());

    if (selected.has(attraction.id)) {
      selected.delete(attraction.id);
      this.tripPlanner.removeAttraction(attraction.id);
      this.showFeedback(`${attraction.name} removed from your trip.`);
    } else {
      selected.add(attraction.id);
      this.tripPlanner.addAttraction({
        id: attraction.id,
        name: attraction.name,
        city: attraction.location.split(',')[0]?.trim() ?? attraction.location,
        category: attraction.category,
        duration: attraction.duration,
        price: attraction.price,
        imageUrl: attraction.imageUrl,
      });
      this.showFeedback(`${attraction.name} added to your trip.`);
    }

    this.selectedAttractionIds.set(selected);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
  }

  private showFeedback(message: string): void {
    this.tripFeedback.set(message);
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
    this.feedbackTimer = setTimeout(() => this.tripFeedback.set(null), 2800);
  }
}
