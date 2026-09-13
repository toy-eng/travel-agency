import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  template: `
    <section class="mx-auto max-w-[1240px] px-4 pb-14 pt-12 sm:px-6">
      <div class="mb-8 flex items-center justify-between gap-4">
        <h2 class="section-heading">
          Your recent searches
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <article class="flex w-full flex-col items-start gap-3 rounded-[18px] border border-[#E8EEF3] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:flex-row md:items-center md:gap-4 md:p-5">
          <div
            class="h-[88px] w-full shrink-0 rounded-[14px] bg-cover bg-center shadow-sm md:h-[72px] md:w-[72px] md:rounded-[18px] lg:h-[88px] lg:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=300&q=80');"
            aria-label="Istanbul, Turkey"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[0.95rem] font-medium leading-snug text-[#112211] sm:text-[1.05rem] lg:text-[1.15rem]">Istanbul, Turkey</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full flex-col items-start gap-3 rounded-[18px] border border-[#E8EEF3] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:flex-row md:items-center md:gap-4 md:p-5">
          <div
            class="h-[88px] w-full shrink-0 rounded-[14px] bg-cover bg-center shadow-sm md:h-[72px] md:w-[72px] md:rounded-[18px] lg:h-[88px] lg:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=300&q=80');"
            aria-label="Sydney, Australia"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[0.95rem] font-medium leading-snug text-[#112211] sm:text-[1.05rem] lg:text-[1.15rem]">Sydney, Australia</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full flex-col items-start gap-3 rounded-[18px] border border-[#E8EEF3] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:flex-row md:items-center md:gap-4 md:p-5">
          <div
            class="h-[88px] w-full shrink-0 rounded-[14px] bg-cover bg-center shadow-sm md:h-[72px] md:w-[72px] md:rounded-[18px] lg:h-[88px] lg:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80');"
            aria-label="Baku, Azerbaijan"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[0.95rem] font-medium leading-snug text-[#112211] sm:text-[1.05rem] lg:text-[1.15rem]">Baku, Azerbaijan</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full flex-col items-start gap-3 rounded-[18px] border border-[#E8EEF3] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:flex-row md:items-center md:gap-4 md:p-5">
          <div
            class="h-[88px] w-full shrink-0 rounded-[14px] bg-cover bg-center shadow-sm md:h-[72px] md:w-[72px] md:rounded-[18px] lg:h-[88px] lg:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80');"
            aria-label="Malé, Maldives"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[0.95rem] font-medium leading-snug text-[#112211] sm:text-[1.05rem] lg:text-[1.15rem]">Malé, Maldives</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearches {}
