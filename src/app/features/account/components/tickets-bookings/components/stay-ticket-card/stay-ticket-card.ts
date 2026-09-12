import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface StayTicket {
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  roomNumber: string;
}

@Component({
  selector: 'app-stay-ticket-card',
  templateUrl: './stay-ticket-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StayTicketCardComponent {
  readonly ticket = input.required<StayTicket>();

  readonly download = output<void>();
  readonly open = output<void>();
}
