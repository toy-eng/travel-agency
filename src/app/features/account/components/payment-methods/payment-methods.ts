import { ChangeDetectionStrategy, Component, output } from '@angular/core';

export interface SavedCard {
  last4: string;
  expiry: string;
  brand: string;
}

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent {
  readonly addCard = output<void>();
  readonly removeCard = output<SavedCard>();

  readonly cards: SavedCard[] = [{ last4: '4321', expiry: '02/27', brand: 'VISA' }];
}
