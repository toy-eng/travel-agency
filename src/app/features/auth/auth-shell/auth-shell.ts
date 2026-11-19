import { ChangeDetectionStrategy, Component, OnDestroy, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-shell',
  imports: [RouterLink],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthShell implements OnDestroy {
  /** Carousel images shown in the right column. */
  images = input<string[]>(['/authCarouselOne.jpg', '/authCarouselTwo.jpg']);

  /** Column ratio: 'equal' = 50/50, 'form-major' = 60/40 (form/carousel). */
  layout = input<'equal' | 'form-major'>('equal');

  /** Index of the currently visible slide. */
  activeIndex = signal(0);

  private readonly intervalMs = 5000;
  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    this.timer = setInterval(() => this.next(), this.intervalMs);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /** Jump to a specific slide (wraps around at the ends). */
  goTo(index: number) {
    const count = this.images().length;
    this.activeIndex.set(((index % count) + count) % count);
  }

  next() {
    this.goTo(this.activeIndex() + 1);
  }

  prev() {
    this.goTo(this.activeIndex() - 1);
  }
}
