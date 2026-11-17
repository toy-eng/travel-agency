import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** White card wrapper for one settings group: title + hint, then the rows. */
@Component({
  selector: 'app-settings-card',
  template: `
    <div
      class="overflow-hidden rounded-[24px] border border-[#dfe7e2] bg-white shadow-[0_8px_30px_rgba(17,34,17,0.05)]"
    >
      <div class="flex items-start gap-4 border-b border-[#edf1ee] px-5 py-5 sm:px-6">
        <span class="mt-1 h-9 w-1 shrink-0 rounded-full bg-[#8DD3BB]" aria-hidden="true"></span>
        <div class="min-w-0">
          <h2
            class="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-[#112211] sm:text-[1.25rem]"
          >
            {{ title() }}
          </h2>
          @if (hint()) {
            <p class="mt-1 max-w-prose text-[0.82rem] leading-snug text-[#6d7972]">{{ hint() }}</p>
          }
        </div>
      </div>

      <div class="divide-y divide-[#edf1ee] px-5 pb-2 sm:px-6">
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
