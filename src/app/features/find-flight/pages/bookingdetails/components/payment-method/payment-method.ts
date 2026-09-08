import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CardModalComponent } from '../card-modal/card-modal';

@Component({
  selector: 'app-bookingdetails-payment-method',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './payment-method.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent {
  readonly selectedMethod = signal<'visa' | 'new'>('visa');

  constructor(private readonly dialog: MatDialog) {}

  selectMethod(method: 'visa' | 'new') {
    this.selectedMethod.set(method);
  }

  openCardModal() {
    this.selectedMethod.set('new');
    this.dialog.open(CardModalComponent, {
      width: '360px',
      maxWidth: 'calc(100vw - 2rem)',
      panelClass: 'booking-card-dialog',
    });
  }
}