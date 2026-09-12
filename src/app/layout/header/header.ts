import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // On inner pages the whole <app-header> host sticks (the host's parent is the
    // full-height shell, whereas the inner <header> would only be as tall as itself).
    '[class.sticky]': '!isHomeRoute()',
    '[class.top-0]': '!isHomeRoute()',
    '[class.z-50]': '!isHomeRoute()',
  },
})
export class Header implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView!;
  private readonly clickHandler = (event: Event) => this.onDocumentClick(event);
  private scrollCleanupFn: (() => void) | null = null;

  /** True once the user has scrolled past the hero threshold on the home page. */
  readonly scrolled = signal(false);

  /** 0 = top of page, 1 = fully scrolled into the white zone. */
  readonly scrollProgress = signal(0);

  /** Interpolated background opacity (0 → 1) over the first 200px of scroll. */
  readonly headerOpacity = computed(() => Math.min(this.scrollProgress(), 1));

  /** Interpolated shadow opacity (0 → 0.1) over the first 200px of scroll. */
  readonly shadowOpacity = computed(() => this.scrollProgress() * 0.1);

  /** True once past the midpoint of the transition — used to flip text colour. */
  readonly textWhite = computed(() => this.scrollProgress() < 0.5);

  readonly isHomeRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url === '/' || this.router.url === ''),
      startWith(this.router.url === '/' || this.router.url === ''),
    ),
  );

  readonly isFlightsRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/flights')),
      startWith(this.router.url.startsWith('/flights')),
    ),
  );

  readonly isStaysRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/stays')),
      startWith(this.router.url.startsWith('/stays')),
    ),
  );

  readonly isFavouritesRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/favourites')),
      startWith(this.router.url.startsWith('/favourites')),
    ),
  );

  readonly isAuthenticated = signal(true);
  readonly showProfileMenu = signal(false);

  private readonly profileButton = viewChild<ElementRef<HTMLButtonElement>>('profileButton');

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        const y = this.window.scrollY;
        this.scrolled.set(y > 10);
        this.scrollProgress.set(Math.min(y / 200, 1));
      };
      this.window.addEventListener('scroll', onScroll, { passive: true });
      this.scrollCleanupFn = () => this.window.removeEventListener('scroll', onScroll);
    });
  }

  ngAfterViewInit(): void {
    this.document.addEventListener('click', this.clickHandler);
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('click', this.clickHandler);
    this.scrollCleanupFn?.();
  }

  toggleProfileMenu(): void {
    this.showProfileMenu.update((value) => !value);
  }

  closeProfileMenu(): void {
    this.showProfileMenu.set(false);
  }

  private onDocumentClick(event: Event): void {
    const target = event.target as Node | null;
    const button = this.profileButton()?.nativeElement;

    if (!button || !target) {
      return;
    }

    if (!button.contains(target) && this.showProfileMenu()) {
      this.closeProfileMenu();
    }
  }
}

