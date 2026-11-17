import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Attraction } from '../../home.models';

@Component({
  selector: 'app-attractions',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './attractions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttractionsComponent {
  readonly items = input<Attraction[]>([]);
  readonly selectedIds = input<ReadonlySet<string>>(new Set<string>());

  readonly addToTrip = output<Attraction>();
}
