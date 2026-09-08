import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { NewCardFormComponent } from '../new-card-form/new-card-form';

@Component({
  selector: 'app-bookingdetails-card-modal',
  imports: [MatDialogModule, NewCardFormComponent],
  standalone: true,
  templateUrl: './card-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardModalComponent {
  constructor(private readonly dialogRef: MatDialogRef<CardModalComponent>) {}

  close() {
    this.dialogRef.close();
  }
}