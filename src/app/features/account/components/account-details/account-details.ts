import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { UserService } from '../../../../core/services/user/user';
import { User } from '../../../../core/models/user';

export interface AccountField {
  label: string;
  value: string;
  /** Optional second action shown before the Change button (e.g. "Add another email"). */
  secondaryAction?: string;
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit {
  readonly changeField = output<AccountField>();
  public userService = inject(UserService)

  user: User = {} as User;
  isLoading = false;
  errorMessage = '';

  readonly fields: AccountField[] = [
    { label: 'Name', value: 'John Doe' },
    {
      label: 'Email',
      value: 'john.doe@gmail.com',
      secondaryAction: 'Add another email',
    },
    { label: 'Password', value: '*************' },
    { label: 'Phone number', value: '+1 000-000-0000' },
    {
      label: 'Address',
      value: 'St 32 main downtown, Los Angeles, California, USA',
    },
    { label: 'Date of birth', value: '01-01-1992' },
  ];

  constructor() {
    console.log('[AccountDetails] component created');
  }

  ngOnInit(): void {
    console.log('[AccountDetails] ngOnInit fired');
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('[AccountDetails] loading user...');
    this.isLoading = true;
    
    // 4. Subscribe to the observable to get the data
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response;
        console.log('user', response);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users from backend.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
