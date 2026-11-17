import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-floating-field',
  standalone: true,
  template: `
    <div class="floating-field" [class.floating-field--disabled]="disabled">
      @if (label) {
        <label class="floating-field__label">{{ label }}</label>
      }

      <div class="floating-field__control">
        @if (type === 'select') {
          <select
            [value]="value"
            [disabled]="disabled"
            (change)="onValueChange($any($event.target).value)"
            [attr.name]="name"
          >
            @for (option of options; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
          <span class="floating-field__caret" aria-hidden="true">▾</span>
        } @else {
          <input
            [type]="type"
            [value]="value"
            [disabled]="disabled"
            [attr.name]="name"
            (input)="onValueChange($any($event.target).value)"
          />
        }

        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .floating-field {
      position: relative;
      width: 100%;
    }

    .floating-field__label {
      position: absolute;
      top: -0.6rem;
      left: 0.75rem;
      z-index: 1;
      background: #ffffff;
      padding: 0 0.35rem;
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
      letter-spacing: 0.01em;
      color: #4f8b75;
      font-family: var(--font-sans);
    }

    .floating-field__control {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 52px;
      border: 1px solid #dfe7e2;
      border-radius: 0.75rem;
      background: #fafcfb;
      padding: 0 0.75rem;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    .floating-field:focus-within .floating-field__control {
      border-color: #8dd3bb;
      box-shadow: 0 0 0 2px rgba(141, 211, 187, 0.22);
    }

    .floating-field--disabled .floating-field__control {
      background: #f2f5f3;
      opacity: 0.8;
      cursor: not-allowed;
    }

    input,
    select {
      width: 100%;
      border: 0;
      outline: none;
      background: transparent;
      color: #112211;
      font-size: 0.9rem;
      font-weight: 500;
      font-family: var(--font-sans);
      padding: 0;
      margin: 0;
    }

    input::placeholder {
      color: #9aa59e;
    }

    select {
      appearance: none;
      cursor: pointer;
      padding-right: 1.25rem;
    }

    .floating-field__caret {
      position: absolute;
      right: 0.75rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: #4f8b75;
      font-size: 1rem;
      line-height: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingFieldComponent),
      multi: true,
    },
  ],
})
export class FloatingFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'select' = 'text';
  @Input() name = '';
  @Input() options: string[] = [];
  @Input({ transform: booleanAttribute }) disabled = false;

  value: string | number = '';
  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | number): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string | number): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
