import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hotel-filter-sidebar',
  standalone: true,
  templateUrl: './hotel-filter-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSidebarComponent {
  readonly title = 'Filters';
  readonly priceMinimum = signal(50);
  readonly priceMaximum = signal(1200);
  readonly ratings = ['0+', '1+', '2+', '3+', '4+'];
  readonly freebies = ['Free breakfast', 'Free parking', 'Free internet', 'Free airport shuttle', 'Free cancellation'];
  readonly amenities = ['24hr front desk', 'Air-conditioned', 'Fitness', 'Pool'];

  readonly expandedSections = signal<Record<string, boolean>>({
    price: true,
    rating: true,
    freebies: true,
    amenities: true,
  });

  isExpanded(section: string) {
    return this.expandedSections()[section];
  }

  toggleSection(section: string) {
    this.expandedSections.update((sections) => ({
      ...sections,
      [section]: !sections[section],
    }));
  }

  updatePriceMinimum(event: Event) {
    this.priceMinimum.set(Number((event.target as HTMLInputElement).value));
  }

  updatePriceMaximum(event: Event) {
    this.priceMaximum.set(Number((event.target as HTMLInputElement).value));
  }
}
