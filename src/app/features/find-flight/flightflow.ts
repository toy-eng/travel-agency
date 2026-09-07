import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { routeTransition } from '../../shared/animations/transitions';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';

@Component({
  selector: 'app-flightflow',
  imports: [RouterOutlet],
  animations: [routeTransition],
  templateUrl: './flightflow.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flightflow {
  private router = inject(Router);

  /** Changes whenever the nested search -> listing route moves. */
  readonly routeKey = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  readonly reduceMotion = prefersReducedMotion();
}
