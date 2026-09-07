import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger registration touches window.matchMedia, which is missing in
// SSR and some test environments, so only register when it is available.
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
