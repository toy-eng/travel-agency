import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './booking-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingLoginComponent {
  readonly phoneNumber = signal('');
}