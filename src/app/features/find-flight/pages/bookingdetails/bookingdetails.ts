import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookingSummaryComponent } from './components/booking-summary/booking-summary';
import { PaymentOptionsComponent } from './components/payment-options/payment-options';
import { PaymentMethodComponent } from './components/payment-method/payment-method';
import { ItineraryCardComponent } from '../flightdetails/components/itinerary-card/itinerary-card';

@Component({
	selector: 'app-bookingdetails',
	imports: [PaymentOptionsComponent, PaymentMethodComponent, BookingSummaryComponent, ItineraryCardComponent],
	standalone: true,
	templateUrl: './bookingdetails.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bookingdetails {}
