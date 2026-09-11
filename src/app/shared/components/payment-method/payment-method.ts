import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { NewCardFormComponent } from '../new-card-form/new-card-form';

@Component({
  selector: 'app-payment-method',
  imports: [MatDialogModule],
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
    this.dialog.open(NewCardFormComponent, {
      width: '360px',
      maxWidth: 'calc(100vw - 2rem)',
      panelClass: 'booking-card-dialog',
    });
  }
}
