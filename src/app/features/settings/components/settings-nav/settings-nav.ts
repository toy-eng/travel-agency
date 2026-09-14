import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type SettingsIcon = 'bell' | 'compass' | 'sliders' | 'shield' | 'help';

export interface SettingsSection {
  id: string;
  label: string;
  icon: SettingsIcon;
}

@Component({
  selector: 'app-settings-nav',
  templateUrl: './settings-nav.html',
  styles: `
    /* Mobile chips */
    .chip {
      white-space: nowrap;
      cursor: pointer;
      border-radius: 999px;
      border: 1px solid #e2e9e5;
      background-color: #ffffff;
      padding: 0.5rem 0.95rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #52635c;
      transition:
        border-color 0.3s ease,
        background-color 0.3s ease,
        color 0.3s ease,
        transform 0.2s ease;
    }

    .chip:hover {
      border-color: #8dd3bb;
      color: #112211;
    }

    .chip:active {
      transform: scale(0.97);
    }

    .chip--active {
      border-color: #8dd3bb;
      background-color: #8dd3bb;
      color: #112211;
    }

    /* Desktop rail */
    .rail {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      gap: 0.7rem;
      border-radius: 0.75rem;
      padding: 0.65rem 1rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: #52635c;
      transition:
        background-color 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.2s ease;
    }

    .rail:hover {
      background-color: #f1fbf7;
      color: #112211;
      transform: translateX(2px);
    }

    .rail--active {
      background-color: #ffffff;
      color: #112211;
      box-shadow: 0 8px 22px rgba(17, 34, 17, 0.06);
    }

    .rail--active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 1.5rem;
      width: 3px;
      transform: translateY(-50%);
      border-radius: 999px;
      background-color: #8dd3bb;
    }

    .rail__icon {
      display: grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      flex-shrink: 0;
      border-radius: 0.5rem;
      background-color: #eaf6f2;
      color: #3f7d68;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    .rail--active .rail__icon {
      background-color: #8dd3bb;
      color: #112211;
    }

    .rail:focus-visible,
    .chip:focus-visible {
      outline: 2px solid #8dd3bb;
      outline-offset: 2px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNavComponent {
  readonly sections = input.required<SettingsSection[]>();
  readonly activeId = input.required<string>();
  readonly select = output<string>();

  private readonly strip = viewChild<ElementRef<HTMLElement>>('strip');
  private readonly chips = viewChildren<ElementRef<HTMLElement>>('chip');
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    // Keep the active chip inside the scrollable strip as the page scrolls through sections.
    effect(() => {
      const strip = this.strip()?.nativeElement;
      const index = this.sections().findIndex((section) => section.id === this.activeId());
      const chip = index >= 0 ? this.chips()[index]?.nativeElement : undefined;

      // The server renders a DOM shim without scrollTo, so this is browser-only.
      if (!strip || !chip || !isPlatformBrowser(this.platformId)) {
        return;
      }

      const centred = chip.offsetLeft - (strip.clientWidth - chip.clientWidth) / 2;
      strip.scrollTo({ left: Math.max(0, centred), behavior: 'smooth' });
    });
  }
}
