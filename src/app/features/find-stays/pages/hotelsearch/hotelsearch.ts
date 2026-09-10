import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HotelsearchHero } from './components/hotelsearch-hero/hotelsearch-hero';
import { SearchForm } from './components/search-form/search-form';
import { RecentSearches } from './components/recent-searches/recent-searches';
import { FalloutOfTravelComponent } from '../../../../shared/components/fallout-of-travel/fallout-of-travel';
import { FallIntoTravelComponent } from '../../../../shared/components/fall-into-travel/fall-into-travel';

@Component({
  selector: 'app-hotelsearch',
  standalone: true,
  imports: [
    HotelsearchHero,
    SearchForm,
    RecentSearches,
    FalloutOfTravelComponent,
    FallIntoTravelComponent,
  ],
  templateUrl: './hotelsearch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotelsearch {}
