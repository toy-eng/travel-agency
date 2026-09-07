import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { DestinationCardItem } from './components/destination-card/destination-card';
import type { PromoCardItem } from './components/promo-card/promo-card';
import type { ReviewCardItem } from './components/review-card/review-card';
import { destinationsMock } from '../../shared/data/destinations.mock';
import { HeroComponent } from './components/hero/hero';
import { SearchFormComponent } from './components/search-form/search-form';
import { PromoSectionComponent } from './components/promo-section/promo-section';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    SearchFormComponent,
    PromoSectionComponent,
    ReviewsSectionComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly destinations: DestinationCardItem[] = destinationsMock;
  readonly promoCards: PromoCardItem[] = [
    {
      title: 'Flights',
      description: 'Search Flights & Places Hire to our most popular destinations',
      imageUrl: '/flightsImg.jpg',
      buttonLabel: 'Show Flights',
    },
    {
      title: 'Hotels',
      description: 'Search hotels & Places Hire to our most popular destinations',
      imageUrl: '/hotelsImg.jpg',
      buttonLabel: 'Show Hotels',
    },
  ];

  readonly reviews: ReviewCardItem[] = [
    {
      quote: '“A real sense of community, nurtured”',
      body: 'Really appreciate the help and support from the staff during these tough times. Shutout to Katie for...',
      author: 'Olga',
      role: 'Weave Studios - Kai Tak',
      source: 'Google',
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
    {
      quote: '“The facilities are superb. Clean, slick, bright.”',
      body: 'A real sense of community, nurtured “Really appreciate the help and support from the staff...',
      author: 'Thomas',
      role: 'Weave Studios – Olympic',
      source: 'Google',
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
    {
      quote: '“A real sense of community, nurtured”',
      body: 'Really appreciate the help and support from the staff during these tough times. Shutout to Katie for...',
      author: 'Eliot',
      role: 'Weave Studios - Kai Tak',
      source: 'Google',
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
  ];

  readonly activeTab = signal<'flights' | 'stays'>('flights');

  setTab(tab: 'flights' | 'stays') {
    this.activeTab.set(tab);
  }
}

