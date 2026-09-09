import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
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
})
export class Header implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly clickHandler = (event: Event) => this.onDocumentClick(event);

  readonly isHomeRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url === '/' || this.router.url === ''),
      startWith(this.router.url === '/' || this.router.url === ''),
    ),
  );

  readonly isFindFlightRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/find-flight')),
      startWith(this.router.url.startsWith('/find-flight')),
    ),
  );

  readonly isFindStaysRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/find-stays')),
      startWith(this.router.url.startsWith('/find-stays')),
    ),
  );

  readonly isAuthenticated = signal(true);
  readonly showProfileMenu = signal(false);

  private readonly profileButton = viewChild<ElementRef<HTMLButtonElement>>('profileButton');

  ngAfterViewInit(): void {
    this.document.addEventListener('click', this.clickHandler);
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('click', this.clickHandler);
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

