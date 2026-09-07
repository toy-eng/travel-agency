import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { routeTransition } from '../../shared/animations/transitions';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Footer],
  animations: [routeTransition],
  templateUrl: './shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  private router = inject(Router);

  /** Changes on every navigation so the outlet transition re-fires. */
  readonly routeKey = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  readonly reduceMotion = prefersReducedMotion();
}
