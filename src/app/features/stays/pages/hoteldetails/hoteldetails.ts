import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AvailableRoomsComponent } from './components/available-rooms/available-rooms';
import { HotelAmenitiesComponent } from './components/hotel-amenities/hotel-amenities';
import { HotelLocationComponent } from './components/hotel-location/hotel-location';
import { HotelOverviewComponent } from './components/hotel-overview/hotel-overview';
import { HotelReviewsComponent } from './components/hotel-reviews/hotel-reviews';
import { HotelSummaryComponent } from './components/hotel-summary/hotel-summary';

@Component({
  selector: 'app-hoteldetails',
  standalone: true,
  imports: [
    HotelSummaryComponent,
    HotelOverviewComponent,
    AvailableRoomsComponent,
    HotelLocationComponent,
    HotelAmenitiesComponent,
    HotelReviewsComponent,
  ],
  templateUrl: './hoteldetails.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hoteldetails {}
