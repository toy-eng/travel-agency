import { ChangeDetectionStrategy, Component, output } from '@angular/core';

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
export class AccountDetailsComponent {
  readonly changeField = output<AccountField>();

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
}
