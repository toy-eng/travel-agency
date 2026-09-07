import { DestroyRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Reactive flag for prefers-reduced-motion: reduce.
 * Returns an always-false readonly signal on the server.
 */
export function prefersReducedMotion() {
  const platformId = inject(PLATFORM_ID);
  const reduced = signal(false);

  if (!isPlatformBrowser(platformId)) {
    return reduced.asReadonly();
  }

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => reduced.set(media.matches);

  update();
  media.addEventListener('change', update);
  inject(DestroyRef).onDestroy(() => media.removeEventListener('change', update));

  return reduced.asReadonly();
}
