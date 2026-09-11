import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flightdetails-features',
  standalone: true,
  templateUrl: './flight-features.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightFeaturesComponent {
  readonly images = [
    'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1544436825-d30bc5d0b9ad?auto=format&fit=crop&w=320&q=80',
  ];
}