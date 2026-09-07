import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlightsearchHeroComponent } from './components/hero/hero';
import { FlightsearchFormComponent } from './components/search-form/search-form';
import { GoPlacesComponent } from './components/go-places/go-places';
import { FalloutOfTravelComponent } from './components/fallout-of-travel/fallout-of-travel';
import { FallIntoTravelComponent } from './components/fall-into-travel/fall-into-travel';

@Component({
  selector: 'app-flightsearch',
  imports: [
    FlightsearchHeroComponent,
    FlightsearchFormComponent,
    GoPlacesComponent,
    FalloutOfTravelComponent,
    FallIntoTravelComponent,
  ],
  templateUrl: './flightsearch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flightsearch {}
