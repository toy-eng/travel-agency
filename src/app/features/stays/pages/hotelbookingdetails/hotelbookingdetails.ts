import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookingLoginComponent } from '../../../../shared/components/booking-login/booking-login';
import { BookingSummaryComponent, PriceRow } from '../../../../shared/components/booking-summary/booking-summary';
import { PaymentOptionsComponent } from '../../../../shared/components/payment-options/payment-options';
import { PaymentMethodComponent } from '../../../../shared/components/payment-method/payment-method';
import { RoomSummaryComponent } from './components/room-summary/room-summary';

@Component({
  selector: 'app-hotelbookingdetails',
  standalone: true,
  imports: [
    RoomSummaryComponent,
    PaymentOptionsComponent,
    PaymentMethodComponent,
    BookingLoginComponent,
    BookingSummaryComponent,
  ],
  templateUrl: './hotelbookingdetails.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotelbookingdetails {
  readonly priceRows: PriceRow[] = [
    { label: 'Base Fare', value: '$240' },
    { label: 'Discount', value: '$0' },
    { label: 'Taxes', value: '$20' },
    { label: 'Service Fee', value: '$5' },
  ];
}
