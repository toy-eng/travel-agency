import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flightdetails-summary',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './flight-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSummaryComponent {}