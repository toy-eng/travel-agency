import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hotelsearch',
  standalone: true,
  templateUrl: './hotelsearch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hotelsearch {}