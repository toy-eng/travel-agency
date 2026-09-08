import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-bookingdetails-payment-options',
  standalone: true,
  templateUrl: './payment-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOptionsComponent {
  readonly selectedOption = signal<'full' | 'later'>('full');

  selectOption(option: 'full' | 'later') {
    this.selectedOption.set(option);
  }
}