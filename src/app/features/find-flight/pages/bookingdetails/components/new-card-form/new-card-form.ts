import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bookingdetails-new-card-form',
  imports: [FormsModule, MatDialogModule],
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

  constructor(private readonly dialogRef: MatDialogRef<NewCardFormComponent>) {}

  close() {
    this.dialogRef.close();
  }

  submit() {
    // The payment integration will be connected here later.
  }
}