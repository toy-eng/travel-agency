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

type ExploreFilter =
  'All' | 'Multi-Stop Routes' | 'Asia' | 'Middle East' | 'Europe' | 'Attractions & Tours';

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

  readonly filters: readonly ExploreFilter[] = [
    'All',
    'Multi-Stop Routes',
    'Asia',
    'Middle East',
    'Europe',
    'Attractions & Tours',
  ];

  readonly activeFilter = signal<ExploreFilter>('All');
  readonly search = signal('');
  readonly feedback = signal<string | null>(null);

  readonly routes = exploreRoutes;
  readonly attractions = exploreAttractions;
  readonly savedCount = computed(() => this.service.attractions().length);

  readonly filteredRoutes = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Attractions & Tours') {
      return [];
    }

    const query = this.search().trim().toLowerCase();
    return this.routes.filter((route) => {
      const regionMatches =
        filter === 'All' || filter === 'Multi-Stop Routes' || route.region === filter;
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
    const filter = this.activeFilter();
    if (filter === 'Multi-Stop Routes') {
      return [];
    }

    const query = this.search().trim().toLowerCase();
    return this.attractions.filter((attraction) => {
      const regionMatches =
        filter === 'All' || filter === 'Attractions & Tours' || attraction.region === filter;
      const searchMatches =
        !query ||
        [attraction.name, attraction.city, attraction.category, attraction.region]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return regionMatches && searchMatches;
    });
  });

  readonly showRoutes = computed(() => this.activeFilter() !== 'Attractions & Tours');
  readonly showAttractions = computed(() => this.activeFilter() !== 'Multi-Stop Routes');
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

  updateSearch(value: string): void {
    this.search.set(value);
  }

  clearSearch(): void {
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
