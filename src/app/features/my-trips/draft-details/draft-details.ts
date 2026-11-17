import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripPlannerService } from '../../../core/services/trip-planner/trip-planner';
import type { TripLeg } from '../../../core/models/trip-planner';

@Component({
  selector: 'app-draft-details',
  imports: [RouterLink],
  templateUrl: './draft-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraftDetails {
  readonly service = inject(TripPlannerService);

  draftNights(): number {
    return this.service.legs().reduce((total, leg) => total + leg.nights, 0);
  }

  draftDateRange(): string {
    const legs = this.service.legs();
    const first = legs[0]?.departDate;
    const last = legs[legs.length - 1]?.departDate;
    if (!first || !last) {
      return 'Dates to be confirmed';
    }
    return first === last
      ? this.formatDate(first)
      : `${this.formatDate(first)} - ${this.formatDate(last)}`;
  }

  draftFlightCount(): number {
    return Object.keys(this.service.flights()).length;
  }

  draftStayCount(): number {
    return Object.keys(this.service.stays()).length;
  }

  legLabel(leg: TripLeg): string {
    return this.service.legLabel(leg);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    }).format(new Date(`${date}T12:00:00Z`));
  }
}
