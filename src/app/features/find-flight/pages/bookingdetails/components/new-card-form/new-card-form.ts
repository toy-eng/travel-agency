import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookingdetails-new-card-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './new-card-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCardFormComponent {
  readonly cardNumber = signal('');
  readonly expiryDate = signal('');
  readonly cvc = signal('');
  readonly nameOnCard = signal('');
  readonly country = signal('United States');
  readonly secureCheckout = signal(true);

  submit() {
    // The payment integration will be connected here later.
  }
}