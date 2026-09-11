import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hotelsearch-hero',
  standalone: true,
  template: `
    <section class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/hotelsImg.jpg')"
        aria-hidden="true"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/55" aria-hidden="true"></div>

      <div class="relative z-10 mx-auto max-w-[1240px] px-4 pb-44 pt-8 sm:px-6 sm:pb-52 sm:pt-10">
        <h1 class="max-w-2xl text-4xl font-display font-extrabold leading-[1.08] text-white drop-shadow-md sm:text-5xl lg:text-[56px]">
          Make your stay <br class="hidden sm:block" />memorable,
          <br class="hidden sm:block" />we&rsquo;ll handle the rest
        </h1>
        <p class="mt-5 text-lg font-sans font-semibold text-white/90 sm:text-xl">
          Handpicked stays for every kind of escape
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsearchHero {}
