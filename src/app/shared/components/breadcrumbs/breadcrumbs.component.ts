import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
  icon?: 'home';
}

const HOME_ITEM: BreadcrumbItem = {
  label: 'Home',
  url: '/',
  icon: 'home',
};

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly items = signal<BreadcrumbItem[]>([HOME_ITEM]);
  readonly isHomePage = computed(() => this.items().length <= 1);
  readonly isTopLevelRoute = computed(() => this.items().length === 2);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.refresh());
  }

  private refresh(): void {
    const items: BreadcrumbItem[] = [HOME_ITEM];
    const pathSegments: string[] = [];
    let route: ActivatedRoute | null = this.route.root.firstChild;

    while (route) {
      const snapshot = route.snapshot;
      if (!snapshot) {
        route = route.firstChild;
        continue;
      }

      const segment = snapshot.url.map((part) => part.path).join('/');

      if (segment) {
        pathSegments.push(segment);
        items.push({
          label: this.labelFor(snapshot, segment),
          url: `/${pathSegments.join('/')}`,
        });
      }

      route = route.firstChild;
    }

    this.items.set(items);
  }

  private labelFor(snapshot: ActivatedRouteSnapshot, segment: string): string {
    const breadcrumb = snapshot.routeConfig?.data?.['breadcrumb'];
    if (typeof breadcrumb === 'string' && breadcrumb.trim()) {
      return breadcrumb.trim();
    }

    const routeTitle = snapshot.routeConfig?.title;
    const title = typeof routeTitle === 'string' ? routeTitle : snapshot.title;
    if (typeof title === 'string' && title.trim()) {
      return title.trim();
    }

    const routePath = snapshot.routeConfig?.path?.split('/').filter(Boolean).at(-1) ?? segment;
    if (routePath.startsWith(':')) {
      return 'Details';
    }

    return this.formatSegment(segment);
  }

  private formatSegment(segment: string): string {
    return segment
      .replace(/[-_]+/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}
