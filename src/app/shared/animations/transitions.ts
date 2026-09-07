import { animate, query, style, transition, trigger } from '@angular/animations';

/**
 * Structural route transition for nested router outlets.
 * Fades the outgoing view out and slides the incoming view in.
 * Only transform + opacity are animated to keep compositing cheap.
 */
export const routeTransition = trigger('routeTransition', [
  transition('* => *', [
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate(
          '180ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0, transform: 'translateY(-8px)' }),
        ),
      ],
      { optional: true },
    ),
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate(
          '460ms 40ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ],
      { optional: true },
    ),
  ]),
]);

/**
 * Quick enter/leave used by controls that swap in and out of a toolbar:
 * promo-code chips, inline inputs, toasts and lightweight dropdowns.
 */
export const quickSwap = trigger('quickSwap', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(6px) scale(0.97)' }),
    animate('240ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
  transition(':leave', [
    animate('130ms ease-in', style({ opacity: 0, transform: 'translateY(-4px) scale(0.98)' })),
  ]),
]);
