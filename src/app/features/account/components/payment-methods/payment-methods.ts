import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

export interface SavedCard {
  last4: string;
  expiry: string;
  brand: string;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  templateUrl: './payment-methods.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent {
  readonly addCard = output<void>();
  readonly removeCard = output<SavedCard>();

  readonly cards = signal<SavedCard[]>([{ last4: '4321', expiry: '02/27', brand: 'VISA' }]);

  remove(card: SavedCard): void {
    this.cards.update((cards) => cards.filter((item) => item.last4 !== card.last4));
    this.removeCard.emit(card);
  }
}
