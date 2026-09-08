import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AirlinePoliciesComponent } from './components/airline-policies/airline-policies';
import { FlightFeaturesComponent } from './components/flight-features/flight-features';
import { FlightSummaryComponent } from './components/flight-summary/flight-summary';
import { ItineraryCardComponent } from './components/itinerary-card/itinerary-card';

@Component({
	selector: 'app-flightdetails',
	standalone: true,
	imports: [
		FlightSummaryComponent,
		FlightFeaturesComponent,
		AirlinePoliciesComponent,
		ItineraryCardComponent,
	],
	templateUrl: './flightdetails.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flightdetails {}
