import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * One line of a settings card: label (plus optional hint) on the left, the control on the right.
 * The control is projected so the same row works for toggles, selects and buttons.
 */
@Component({
  selector: 'app-setting-row',
  template: `
    <div class="flex items-start justify-between gap-4 sm:gap-8" [class.py-4]="!compact()" [class.py-2.5]="compact()">
      <div class="min-w-0">
        <p class="text-[0.92rem] font-semibold text-[#112211]">{{ label() }}</p>
        @if (hint()) {
          <p class="mt-0.5 max-w-prose text-[0.8rem] leading-snug text-[#52635c]">{{ hint() }}</p>
        }
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingRowComponent {
  readonly label = input.required<string>();
  readonly hint = input<string>();
  /** Tightens the row when the page density is set to compact. */
  readonly compact = input(false);
}
