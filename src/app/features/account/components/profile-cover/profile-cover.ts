import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-profile-cover',
  templateUrl: './profile-cover.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCoverComponent {
  readonly name = input.required<string>();
  readonly email = input.required<string>();
  readonly avatarUrl = input.required<string>();

  readonly uploadCover = output<void>();
  readonly changeAvatar = output<void>();
}
