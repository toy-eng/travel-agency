import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hotelbookingdetails-terms-and-condition',
  templateUrl: './terms-and-condition.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionComponent {
  readonly hotelLogo = signal('CVK');
  readonly hotelLogoSub = signal('Park Bosphorus Hotel');
  readonly hotelLogoCity = signal('Istanbul');
  readonly guestName = signal('James Doe');
  readonly guestAvatar = signal('https://i.pravatar.cc/80?img=12');
  readonly roomName = signal('Superior room - 1 double bed or 2 twin beds');
  readonly checkInDate = signal('Thu, Dec 8');
  readonly checkOutDate = signal('Fri, Dec 9');
  readonly checkInTime = signal('12:00pm');
  readonly checkOutTime = signal('11:30pm');
  readonly roomNumber = signal('On arrival');
  readonly bookingInitials = signal('EK');
  readonly bookingRef = signal('ABC12345');
}
