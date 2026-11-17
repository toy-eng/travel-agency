import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user/user';

export interface AccountField {
  label: string;
  value: string;
  /** Optional second action shown before the Change button (e.g. "Add another email"). */
  secondaryAction?: string;
}

@Component({
  selector: 'app-account-details',
  standalone: true,
  templateUrl: './account-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit {
  private readonly userService = inject(UserService);

  readonly changeField = output<AccountField>();
  readonly user = signal<User | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');

  readonly fields = computed<AccountField[]>(() => {
    const user = this.user();
    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'John Doe';
    const address = user?.address;
    const addressLine = address
      ? [
          address.street,
          address.neighbourhood,
          address.city,
          address.state,
          address.postalCode,
          address.countryCode,
        ]
          .filter(Boolean)
          .join(', ')
      : 'St 32 main downtown, Los Angeles, California, USA';

    return [
      { label: 'Name', value: fullName },
      {
        label: 'Email',
        value: user?.email ?? 'john.doe@gmail.com',
        secondaryAction: 'Add another email',
      },
      { label: 'Password', value: '••••••••••••' },
      { label: 'Phone number', value: user?.phone ?? '+1 000-000-0000' },
      { label: 'Address', value: addressLine },
      { label: 'Date of birth', value: this.formatDateOfBirth(user?.dateOfBirth) },
    ];
  });

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.isLoading.set(true);
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Profile details could not be loaded. Showing your saved defaults.');
        this.isLoading.set(false);
      },
    });
  }

  private formatDateOfBirth(value: string | undefined): string {
    if (!value) {
      return '01-01-1992';
    }

    const date = new Date(`${value}T12:00:00Z`);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }
}
