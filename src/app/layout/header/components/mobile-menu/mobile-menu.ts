import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MobileNavItem {
  path: string;
  label: string;
  icon: 'home' | 'plane' | 'bed' | 'heart';
  /** Match the exact URL only (used for the home link). */
  exact?: boolean;
}

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  readonly open = input.required<boolean>();
  readonly isAuthenticated = input(true);

  readonly closed = output<void>();

  readonly navItems: MobileNavItem[] = [
    { path: '/', label: 'Home', icon: 'home', exact: true },
    { path: '/flights', label: 'Find Flight', icon: 'plane' },
    { path: '/stays', label: 'Find Stays', icon: 'bed' },
    { path: '/favourites', label: 'Favourites', icon: 'heart' },
  ];
}
