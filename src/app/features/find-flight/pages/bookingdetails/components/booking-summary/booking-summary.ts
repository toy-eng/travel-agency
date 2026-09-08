import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bookingdetails-summary',
  standalone: true,
  templateUrl: './booking-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryComponent {}