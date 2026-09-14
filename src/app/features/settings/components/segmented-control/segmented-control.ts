import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface SegmentedOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-segmented-control',
  template: `
    <div class="segmented" role="radiogroup" [attr.aria-label]="label()">
      @for (option of options(); track option.value) {
        <button
          type="button"
          role="radio"
          class="seg"
          [class.seg--active]="value() === option.value"
          [attr.aria-checked]="value() === option.value"
          (click)="valueChange.emit(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .segmented {
      display: inline-flex;
      gap: 0.25rem;
      padding: 0.25rem;
      border-radius: 999px;
      background-color: #eff5f2;
    }

    .seg {
      cursor: pointer;
      border-radius: 999px;
      padding: 0.4rem 0.95rem;
      font-size: 0.78rem;
      font-weight: 600;
      color: #52635c;
      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.2s ease;
    }

    .seg:hover {
      color: #112211;
    }

    .seg:active {
      transform: scale(0.96);
    }

    .seg:focus-visible {
      outline: 2px solid #8dd3bb;
      outline-offset: 2px;
    }

    .seg--active {
      background-color: #8dd3bb;
      color: #112211;
      box-shadow: 0 4px 12px rgba(141, 211, 187, 0.35);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlComponent {
  readonly options = input.required<SegmentedOption[]>();
  readonly value = input.required<string>();
  readonly label = input('Options');
  readonly valueChange = output<string>();
}
