import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flightdetails-policies',
  standalone: true,
  templateUrl: './airline-policies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirlinePoliciesComponent {
  readonly policies = [
    'Pre-flight cleaning, installation of cabin HEPA filters.',
    'Pre-flight health screening questions.',
  ];
}