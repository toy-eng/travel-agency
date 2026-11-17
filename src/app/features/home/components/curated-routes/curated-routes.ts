import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { CuratedRoute } from '../../home.models';

@Component({
  selector: 'app-curated-routes',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './curated-routes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuratedRoutesComponent {
  readonly routes = input<CuratedRoute[]>([]);

  readonly routeSelected = output<CuratedRoute>();
}
