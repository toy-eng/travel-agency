import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Review {
  score: string;
  label: string;
  name: string;
  avatar: string;
  text: string;
}

@Component({
  selector: 'app-hoteldetails-reviews',
  standalone: true,
  templateUrl: './hotel-reviews.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelReviewsComponent {
  readonly rating = signal(4.2);
  readonly ratingLabel = signal('Very good');
  readonly reviewCount = signal(371);

  readonly currentPage = signal(1);
  readonly totalPages = signal(40);

  readonly reviews = signal<Review[]>([
    {
      score: '5.0',
      label: 'Amazing',
      name: 'Omar Siphron',
      avatar: '/hotelsImg.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      score: '5.0',
      label: 'Amazing',
      name: 'Cristofer Ekstrom Bothman',
      avatar: '/hotelsImg.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      score: '5.0',
      label: 'Amazing',
      name: 'Kaiya Lubin',
      avatar: '/hotelsImg.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      score: '5.0',
      label: 'Amazing',
      name: 'Erin Septimus',
      avatar: '/hotelsImg.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      score: '5.0',
      label: 'Amazing',
      name: 'Terry George',
      avatar: '/hotelsImg.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ]);

  readonly canGoPrevious = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());

  goToPrevious() {
    if (this.canGoPrevious()) {
      this.currentPage.update((page) => page - 1);
    }
  }

  goToNext() {
    if (this.canGoNext()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
