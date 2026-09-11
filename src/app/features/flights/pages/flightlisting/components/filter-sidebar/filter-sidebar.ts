import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-flightlisting-filter-sidebar',
  standalone: true,
  templateUrl: './filter-sidebar.html',
})
export class FilterSidebarComponent {
  @Input() title = 'Filters';
  @Input() priceRange = '$300 - $1,200';
  @Input() stopOptions: string[] = ['Non-stop', '1 stop', '2+ stops'];
  @Input() airlineOptions: string[] = [
    'Emirates',
    'Qatar Airways',
    'Air Arabia',
    'Fly Dubai',
    'Etihad Airways',
  ];
  @Input() timeOptions: string[] = ['Morning', 'Afternoon', 'Evening', 'Night'];

  readonly expandedSections = signal<Record<string, boolean>>({
    price: true,
    departure: true,
    rating: true,
    airlines: true,
    trips: true,
  });
  readonly priceMinimum = signal(50);
  readonly priceMaximum = signal(1200);
  readonly departureMinimum = signal(0);
  readonly departureMaximum = signal(1439);
  readonly ratings = ['0+', '1+', '2+', '3+', '4+'];
  readonly tripOptions = ['Round trip', 'On Way', 'Multi-City', 'My Dates Are Flexible'];

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

  updateDepartureMinimum(event: Event) {
    this.departureMinimum.set(Number((event.target as HTMLInputElement).value));
  }

  updateDepartureMaximum(event: Event) {
    this.departureMaximum.set(Number((event.target as HTMLInputElement).value));
  }

  formatTime(minutes: number) {
    if (minutes === 0) {
      return '12:01AM';
    }

    if (minutes >= 1439) {
      return '11:56PM';
    }

    const hours = Math.floor(minutes / 60);
    const minuteValue = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minuteValue.toString().padStart(2, '0')}${period}`;
  }
}
