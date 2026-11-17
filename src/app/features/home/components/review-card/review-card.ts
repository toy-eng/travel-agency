import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ReviewCardItem {
  quote: string;
  body: string;
  author: string;
  role: string;
  source: string;
  imageUrl: string;
  rating: number;
}

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  @Input() review!: ReviewCardItem;

  readonly stars = Array.from({ length: 5 }, (_, index) => index + 1);
}
