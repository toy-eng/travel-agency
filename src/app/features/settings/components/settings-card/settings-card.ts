import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** White card wrapper for one settings group: title + hint, then the rows. */
@Component({
  selector: 'app-settings-card',
  template: `
    <div class="rounded-[14px] bg-white px-5 shadow-[0_8px_22px_rgba(17,34,17,0.06)] sm:px-6">
      <div class="border-b border-[rgba(17,34,17,0.08)] py-5">
        <h2 class="font-display text-[1.1rem] font-extrabold text-[#112211] sm:text-[1.2rem]">
          {{ title() }}
        </h2>
        @if (hint()) {
          <p class="mt-1 max-w-prose text-[0.82rem] leading-snug text-[#52635c]">{{ hint() }}</p>
        }
      </div>

      <div class="divide-y divide-[rgba(17,34,17,0.08)] pb-2">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCardComponent {
  readonly title = input.required<string>();
  readonly hint = input<string>();
}
