import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  template: `
    <button
      type="button"
      role="switch"
      class="switch"
      [class.switch--on]="checked()"
      [attr.aria-checked]="checked()"
      [attr.aria-label]="label()"
      (click)="toggle()"
    >
      <span
        aria-hidden="true"
        class="switch__knob block size-5 rounded-full bg-white shadow-[0_1px_4px_rgba(17,34,17,0.25)]"
      ></span>
    </button>
  `,
  styles: `
    .switch {
      position: relative;
      display: inline-flex;
      height: 1.5rem;
      width: 2.75rem;
      flex-shrink: 0;
      cursor: pointer;
      align-items: center;
      border-radius: 999px;
      background-color: #dfe5e2;
      transition: background-color 0.3s ease;
    }

    /* Knob travel is handled in CSS: a dot is not allowed in an Angular class binding. */
    .switch__knob {
      translate: 2px 0;
      transition: translate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .switch--on {
      background-color: #8dd3bb;
    }

    .switch--on .switch__knob {
      translate: 22px 0;
    }

    .switch:focus-visible {
      outline: 2px solid #8dd3bb;
      outline-offset: 2px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchComponent {
  readonly checked = input.required<boolean>();
  readonly label = input('Toggle setting');
  readonly checkedChange = output<boolean>();

  protected toggle(): void {
    this.checkedChange.emit(!this.checked());
  }
}
