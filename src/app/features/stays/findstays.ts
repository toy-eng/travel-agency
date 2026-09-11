import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { routeTransition } from '../../shared/animations/transitions';
import { prefersReducedMotion } from '../../shared/motion/prefers-reduced-motion';

@Component({
  selector: 'app-stays',
  imports: [RouterOutlet],
  animations: [routeTransition],
  templateUrl: './findstays.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stays {
  private router = inject(Router);

  readonly routeKey = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  readonly reduceMotion = prefersReducedMotion();
}