import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  afterNextRender,
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
  icon: 'home' | 'plane' | 'bed' | 'heart';
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
    { path: '/flights', label: 'Find Flight', icon: 'plane' },
    { path: '/stays', label: 'Find Stays', icon: 'bed' },
    { path: '/favourites', label: 'Favourites', icon: 'heart' },
  ];

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
