import {
  DOCUMENT,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal';
import { SegmentedControlComponent, SegmentedOption } from './components/segmented-control/segmented-control';
import { SettingRowComponent } from './components/setting-row/setting-row';
import { SettingsCardComponent } from './components/settings-card/settings-card';
import { SettingsNavComponent, SettingsSection } from './components/settings-nav/settings-nav';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch';

interface ToggleSetting {
  id: string;
  label: string;
  hint: string;
}

interface SelectSetting {
  id: string;
  label: string;
  hint: string;
  options: string[];
}

interface ActionSetting {
  id: string;
  label: string;
  hint: string;
  cta: string;
  icon: 'key' | 'devices' | 'download';
  /** Message flashed in the header once the action is triggered. */
  confirmation: string;
  tone?: 'danger';
}

@Component({
  selector: 'app-settings',
  imports: [
    SettingsNavComponent,
    SettingsCardComponent,
    SettingRowComponent,
    ToggleSwitchComponent,
    SegmentedControlComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './settings.html',
  styles: `
    .action {
      display: inline-flex;
      height: 2.5rem;
      flex-shrink: 0;
      cursor: pointer;
      align-items: center;
      gap: 0.5rem;
      border-radius: 8px;
      border: 1px solid #8dd3bb;
      background-color: #ffffff;
      padding: 0 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #112211;
      transition:
        transform 0.2s ease,
        background-color 0.3s ease,
        border-color 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease;
    }

    .action:hover {
      background-color: #f1fbf7;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .action:active {
      transform: scale(0.97);
    }

    .action--danger {
      border-color: #f3c7c2;
      color: #c0392b;
    }

    .action--danger:hover {
      background-color: #fdeceb;
    }

    .action:focus-visible {
      outline: 2px solid #8dd3bb;
      outline-offset: 2px;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      border-radius: 12px;
      border: 1px solid #e2e9e5;
      padding: 0.9rem 1rem;
      transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        border-color 0.3s ease,
        background-color 0.3s ease,
        box-shadow 0.3s ease;
    }

    .contact:hover {
      border-color: #8dd3bb;
      background-color: #f1fbf7;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(17, 34, 17, 0.08);
    }

    .contact__icon {
      display: grid;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      flex-shrink: 0;
      border-radius: 10px;
      background-color: #eaf6f2;
      color: #3f7d68;
    }

    .contact__label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #112211;
    }

    .contact__value {
      display: block;
      font-size: 0.76rem;
      color: #52635c;
    }

    details[open] .faq-answer {
      animation: faq-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes faq-in {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }

      to {
        opacity: 1;
        transform: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private flashTimer: ReturnType<typeof setTimeout> | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  private readonly visibleSections = new Set<string>();

  readonly sections: SettingsSection[] = [
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'travel', label: 'Travel preferences', icon: 'compass' },
    { id: 'appearance', label: 'Appearance', icon: 'sliders' },
    { id: 'privacy', label: 'Privacy & security', icon: 'shield' },
    { id: 'support', label: 'Support', icon: 'help' },
  ];

  readonly activeSection = signal(this.sections[0].id);
  readonly feedback = signal<string | null>(null);

  readonly notificationToggles: ToggleSetting[] = [
    {
      id: 'bookingUpdates',
      label: 'Booking & trip updates',
      hint: 'Confirmations, check-in reminders and gate changes.',
    },
    {
      id: 'priceAlerts',
      label: 'Price alerts',
      hint: 'Tell me when a saved route drops in price.',
    },
    {
      id: 'deals',
      label: 'Deals & inspiration',
      hint: 'Occasional offers for the places you browse.',
    },
    { id: 'productNews', label: 'Product news', hint: 'New features and improvements to the app.' },
  ];

  readonly preferenceToggles: ToggleSetting[] = [
    {
      id: 'taxesUpfront',
      label: 'Show taxes & fees upfront',
      hint: 'Include them in the price on every result card.',
    },
    {
      id: 'autoCheckIn',
      label: 'Auto check-in',
      hint: 'Check me in 24 hours before departure when the airline allows it.',
    },
  ];

  readonly selectSettings: SelectSetting[] = [
    {
      id: 'currency',
      label: 'Preferred currency',
      hint: 'Used for every price on the site.',
      options: ['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)'],
    },
    {
      id: 'language',
      label: 'Language',
      hint: 'Applies to the interface and emails.',
      options: ['English (UK)', 'English (US)', 'Français', 'Español'],
    },
    {
      id: 'seat',
      label: 'Seat preference',
      hint: 'We will try to preselect this seat for you.',
      options: ['No preference', 'Aisle', 'Window', 'Extra legroom'],
    },
  ];

  readonly privacyToggles: ToggleSetting[] = [
    {
      id: 'twoFactor',
      label: 'Two-factor authentication',
      hint: 'Ask for a code from your phone whenever you sign in.',
    },
    {
      id: 'searchHistory',
      label: 'Save search history',
      hint: 'Keep recent searches so booking takes fewer taps.',
    },
    {
      id: 'personalised',
      label: 'Personalised recommendations',
      hint: 'Use past trips to tailor destinations and stays.',
    },
  ];

  readonly privacyActions: ActionSetting[] = [
    {
      id: 'password',
      label: 'Password',
      hint: 'We will email a reset link to john.doe@gmail.com.',
      cta: 'Send reset link',
      icon: 'key',
      confirmation: 'Reset link sent',
    },
    {
      id: 'sessions',
      label: 'Active sessions',
      hint: 'Signed in on 3 other devices.',
      cta: 'Sign out everywhere',
      icon: 'devices',
      confirmation: 'Signed out of 3 devices',
      tone: 'danger',
    },
    {
      id: 'export',
      label: 'Your data',
      hint: 'Download everything we store about your trips.',
      cta: 'Request export',
      icon: 'download',
      confirmation: 'Export requested',
    },
  ];

  readonly faqs = [
    {
      question: 'How do I change the email on my bookings?',
      answer:
        'Update it under Account → Email, then open the booking and use “Send to a new address”. Confirmations are re-sent instantly.',
    },
    {
      question: 'Can I cancel a non-refundable stay?',
      answer:
        'Some partners allow a date change instead of a refund. Open the booking, choose “Request change” and we will ask the property on your behalf.',
    },
    {
      question: 'Why is a price different at checkout?',
      answer:
        'Currencies are converted at the moment of payment. Turn on “Show taxes & fees upfront” above to always see the full amount on the results page.',
    },
  ];

  /** Live state for every switch on the page. */
  readonly toggles = signal<Record<string, boolean>>({
    bookingUpdates: true,
    priceAlerts: true,
    deals: false,
    productNews: true,
    taxesUpfront: false,
    autoCheckIn: true,
    twoFactor: false,
    searchHistory: true,
    personalised: true,
    reduceMotion: false,
  });

  readonly selects = signal<Record<string, string>>({
    currency: 'USD ($)',
    language: 'English (UK)',
    seat: 'No preference',
  });

  readonly density = signal('comfortable');
  readonly densityOptions: SegmentedOption[] = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
  ];

  constructor() {
    afterNextRender(() => this.observeSections());
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    if (this.flashTimer) {
      clearTimeout(this.flashTimer);
    }
    this.document.documentElement.classList.remove('force-reduce-motion');
  }

  isCompact(): boolean {
    return this.density() === 'compact';
  }

  setToggle(id: string, value: boolean): void {
    this.toggles.update((state) => ({ ...state, [id]: value }));

    if (id === 'reduceMotion') {
      // Real effect: the class mirrors the prefers-reduced-motion rules for everyone.
      this.document.documentElement.classList.toggle('force-reduce-motion', value);
      this.flash(value ? 'Motion reduced' : 'Motion restored');
      return;
    }

    this.flash('Saved');
  }

  setSelect(id: string, value: string): void {
    this.selects.update((state) => ({ ...state, [id]: value }));
    this.flash('Saved');
  }

  setDensity(value: string): void {
    this.density.set(value);
    this.flash('Saved');
  }

  runAction(action: ActionSetting): void {
    this.flash(action.confirmation);
  }

  goToSection(id: string): void {
    this.activeSection.set(id);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private flash(message: string): void {
    this.feedback.set(message);
    if (this.flashTimer) {
      clearTimeout(this.flashTimer);
    }
    this.flashTimer = setTimeout(() => this.feedback.set(null), 2200);
  }

  /** Highlights the nav item of whichever section is closest to the top of the viewport. */
  private observeSections(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visibleSections.add(entry.target.id);
          } else {
            this.visibleSections.delete(entry.target.id);
          }
        }

        // Sections are declared in document order, so the first visible one is the topmost.
        const active = this.sections.find((section) => this.visibleSections.has(section.id));
        if (active) {
          this.activeSection.set(active.id);
        }
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 },
    );

    for (const section of this.sections) {
      const element = this.document.getElementById(section.id);
      if (element) {
        this.sectionObserver.observe(element);
      }
    }
  }
}
