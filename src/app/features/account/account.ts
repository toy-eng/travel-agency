import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewCardFormComponent } from '../../shared/components/new-card-form/new-card-form';
import { AccountDetailsComponent } from './components/account-details/account-details';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods';
import { ProfileCoverComponent } from './components/profile-cover/profile-cover';
import { TabBarComponent, TabItem } from './components/tab-bar/tab-bar';
import { TicketsBookingsComponent } from './components/tickets-bookings/tickets-bookings';

export type AccountTab = 'account' | 'tickets' | 'payment-methods';

@Component({
  selector: 'app-account',
  imports: [
    TabBarComponent,
    ProfileCoverComponent,
    AccountDetailsComponent,
    TicketsBookingsComponent,
    PaymentMethodsComponent,
  ],
  templateUrl: './account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account {
  private readonly dialog = inject(MatDialog);

  readonly activeTab = signal<AccountTab>('account');

  readonly tabs: TabItem[] = [
    { id: 'account', label: 'Account' },
    { id: 'tickets', label: 'Tickets/Bookings' },
    { id: 'payment-methods', label: 'Payment methods' },
  ];

  readonly name = signal('John Doe.');
  readonly email = signal('john.doe@gmail.com');
  readonly avatarUrl = signal('https://i.pravatar.cc/160?img=12');

  setTab(tab: string): void {
    this.activeTab.set(tab as AccountTab);
  }

  openCardModal(): void {
    this.dialog.open(NewCardFormComponent, {
      width: '360px',
      maxWidth: 'calc(100vw - 2rem)',
      panelClass: 'booking-card-dialog',
    });
  }
}
