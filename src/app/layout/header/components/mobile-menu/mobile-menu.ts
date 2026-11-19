import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MobileNavItem {
  path: string;
  label: string;
  icon: 'heart' | 'home' | 'compass' | 'globe' | 'suitcase';
  /** Match the exact URL only (used for the home link). */
  exact?: boolean;
}

export interface ProfileLink {
  path: string;
  label: string;
  icon: 'user' | 'card' | 'gear' | 'help';
}

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly clickHandler = (event: Event) => this.onDocumentClick(event);
  private readonly profileMenu = viewChild<ElementRef<HTMLElement>>('profileMenu');

  readonly open = input.required<boolean>();
  readonly isAuthenticated = input(true);

  readonly closed = output<void>();

  readonly navItems: MobileNavItem[] = [
    { path: '/', label: 'Home', icon: 'home', exact: true },
    { path: '/plan-trip', label: 'Plan Trip', icon: 'compass' },
    { path: '/explore', label: 'Explore', icon: 'globe' },
    { path: '/my-trips', label: 'My Trips', icon: 'suitcase' },
    { path: '/favourites', label: 'Favourites', icon: 'heart' },
  ];

  readonly visibleNavItems = computed(() =>
    this.isAuthenticated()
      ? this.navItems
      : this.navItems.filter((item) => item.path !== '/my-trips'),
  );

  /** Mirrors the desktop profile dropdown. */
  readonly profileLinks: ProfileLink[] = [
    { path: '/account', label: 'My account', icon: 'user' },
    { path: '/payments', label: 'Payments', icon: 'card' },
    { path: '/settings', label: 'Settings', icon: 'gear' },
    { path: '/support', label: 'Support', icon: 'help' },
  ];

  readonly showProfileMenu = signal(false);

  constructor() {
    // The popup must not survive a panel close/reopen.
    effect(() => {
      if (!this.open()) {
        this.showProfileMenu.set(false);
      }
    });

    afterNextRender(() => this.addDocumentClickListener());
  }

  ngOnDestroy(): void {
    this.removeDocumentClickListener();
  }

  toggleProfileMenu(): void {
    this.showProfileMenu.update((visible) => !visible);
  }

  closeProfileMenu(): void {
    this.showProfileMenu.set(false);
  }

  handleNavClick(): void {
    this.closed.emit();
  }

  private onDocumentClick(event: Event): void {
    if (!this.showProfileMenu()) {
      return;
    }

    const target = event.target as Node | null;
    const popup = this.profileMenu()?.nativeElement;
    if (target && popup && !popup.contains(target)) {
      this.closeProfileMenu();
    }
  }

  /** Only wired up in the browser — the panel is opened by a click anyway. */
  private addDocumentClickListener(): void {
    this.document.addEventListener('click', this.clickHandler);
  }

  private removeDocumentClickListener(): void {
    this.document.removeEventListener('click', this.clickHandler);
  }
}
