import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { TripPlannerService } from '../../core/services/trip-planner/trip-planner';
import { gsap } from '../../shared/motion/gsap';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';
import { exploreAttractions, exploreRoutes } from './explore.data';
import type { ExploreAttraction, ExploreRoute } from './explore.data';

type ExploreFilter = 'All' | 'Asia' | 'Middle East' | 'Africa' | 'Popular';
type PopularView = 'Cities' | 'Attractions & Tours';

const cardMotion = trigger('cardMotion', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(14px)' }),
    animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
  transition(':leave', [
    animate(
      '180ms cubic-bezier(0.4, 0, 1, 1)',
      style({ opacity: 0, transform: 'translateY(-8px)' }),
    ),
  ]),
]);

@Component({
  selector: 'app-explore',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardMotion],
})
export class Explore implements AfterViewInit, OnDestroy {
  readonly service = inject(TripPlannerService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reduceMotion = prefersReducedMotion();
  private motionContext: gsap.Context | null = null;
  private feedbackTimer: ReturnType<typeof setTimeout> | null = null;

  readonly filters: readonly ExploreFilter[] = ['All', 'Asia', 'Middle East', 'Africa', 'Popular'];
  readonly popularViews: readonly PopularView[] = ['Cities', 'Attractions & Tours'];

  readonly activeFilter = signal<ExploreFilter>('All');
  readonly activePopularView = signal<PopularView>('Cities');
  readonly search = signal('');
  readonly feedback = signal<string | null>(null);

  readonly routes = exploreRoutes;
  readonly attractions = exploreAttractions;
  readonly savedCount = computed(() => this.service.attractions().length);
  readonly isPopular = computed(() => this.activeFilter() === 'Popular');
  readonly showRoutes = computed(() => !this.isPopular() || this.activePopularView() === 'Cities');
  readonly showAttractions = computed(
    () => this.isPopular() && this.activePopularView() === 'Attractions & Tours',
  );
  readonly routeSectionEyebrow = computed(() =>
    this.isPopular() ? 'Popular cities' : 'Curated multi-stop packages',
  );
  readonly routeSectionHeading = computed(() =>
    this.isPopular()
      ? 'Cities worth making plans around.'
      : 'Routes worth taking the long way for.',
  );

  readonly filteredRoutes = computed(() => {
    const filter = this.activeFilter();
    if (!this.showRoutes()) {
      return [];
    }

    const query = this.search().trim().toLowerCase();
    return this.routes.filter((route) => {
      const regionMatches = filter === 'All' || filter === 'Popular' || route.region === filter;
      const searchMatches =
        !query ||
        [route.title, route.description, route.routeLabel, route.region]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return regionMatches && searchMatches;
    });
  });

  readonly filteredAttractions = computed(() => {
    if (!this.showAttractions()) {
      return [];
    }

    const query = this.search().trim().toLowerCase();
    return this.attractions.filter((attraction) => {
      const searchMatches =
        !query ||
        [attraction.name, attraction.city, attraction.category, attraction.region]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return searchMatches;
    });
  });

  readonly hasResults = computed(
    () => this.filteredRoutes().length > 0 || this.filteredAttractions().length > 0,
  );

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.reduceMotion()) {
      return;
    }

    this.motionContext = gsap.context(() => {
      gsap.from('[data-explore-reveal]', {
        opacity: 0,
        y: 18,
        duration: 0.62,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.motionContext?.revert();
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
  }

  setFilter(filter: ExploreFilter): void {
    this.activeFilter.set(filter);
  }

  setPopularView(view: PopularView): void {
    this.activePopularView.set(view);
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }

  clearSearch(): void {
    this.search.set('');
  }

  resetFilters(): void {
    this.activeFilter.set('All');
    this.activePopularView.set('Cities');
    this.search.set('');
  }

  customizeRoute(route: ExploreRoute): void {
    this.service.applyCuratedRoute(route);
    void this.router.navigate(['/plan-trip']);
  }

  addAttraction(attraction: ExploreAttraction): void {
    this.service.addAttraction(attraction);
    this.showFeedback(`${attraction.name} added to your itinerary draft.`);
  }

  isAdded(attractionId: string): boolean {
    return this.service.attractions().some((attraction) => attraction.id === attractionId);
  }

  private showFeedback(message: string): void {
    this.feedback.set(message);
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
    this.feedbackTimer = setTimeout(() => this.feedback.set(null), 2800);
  }
}
