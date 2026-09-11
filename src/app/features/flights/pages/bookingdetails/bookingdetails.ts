import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookingSummaryComponent, PriceRow } from '../../../../shared/components/booking-summary/booking-summary';
import { PaymentOptionsComponent } from '../../../../shared/components/payment-options/payment-options';
import { PaymentMethodComponent } from '../../../../shared/components/payment-method/payment-method';
import { ItineraryCardComponent } from '../flightdetails/components/itinerary-card/itinerary-card';

@Component({
	selector: 'app-bookingdetails',
	imports: [PaymentOptionsComponent, PaymentMethodComponent, BookingSummaryComponent, ItineraryCardComponent],
	standalone: true,
	templateUrl: './bookingdetails.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bookingdetails {
	readonly priceRows: PriceRow[] = [
		{ label: 'Base Fare', value: '$400' },
		{ label: 'Discount', value: '$400' },
		{ label: 'Taxes', value: '$400' },
		{ label: 'Service Fee', value: '$400' },
	];
}
