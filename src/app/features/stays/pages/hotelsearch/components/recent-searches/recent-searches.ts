import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  standalone: true,
  template: `
    <section class="mx-auto max-w-[1240px] px-4 pb-14 pt-12 sm:px-6">
      <div class="mb-8 flex items-center justify-between gap-4">
        <h2 class="section-heading">
          Your recent searches
        </h2>
      </div>

      <div class="grid gap-5 md:grid-cols-4 md:gap-6">
        <article class="flex w-full items-center gap-4 rounded-[18px] border border-[#E8EEF3] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:p-5">
          <div
            class="h-[72px] w-[72px] rounded-[18px] bg-cover bg-center shadow-sm md:h-[88px] md:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=300&q=80');"
            aria-label="Istanbul, Turkey"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[1.15rem] font-medium text-[#112211]">Istanbul, Turkey</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full items-center gap-4 rounded-[18px] border border-[#E8EEF3] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:p-5">
          <div
            class="h-[72px] w-[72px] rounded-[18px] bg-cover bg-center shadow-sm md:h-[88px] md:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=300&q=80');"
            aria-label="Sydney, Australia"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[1.15rem] font-medium text-[#112211]">Sydney, Australia</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full items-center gap-4 rounded-[18px] border border-[#E8EEF3] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:p-5">
          <div
            class="h-[72px] w-[72px] rounded-[18px] bg-cover bg-center shadow-sm md:h-[88px] md:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80');"
            aria-label="Baku, Azerbaijan"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[1.15rem] font-medium text-[#112211]">Baku, Azerbaijan</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>

        <article class="flex w-full items-center gap-4 rounded-[18px] border border-[#E8EEF3] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#EEF7F3] hover:shadow-[0_10px_24px_rgba(17,34,17,0.08)] md:p-5">
          <div
            class="h-[72px] w-[72px] rounded-[18px] bg-cover bg-center shadow-sm md:h-[88px] md:w-[88px]"
            style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80');"
            aria-label="Malé, Maldives"
          ></div>
          <div class="min-w-0 flex-1">
            <p class="text-[1.15rem] font-medium text-[#112211]">Malé, Maldives</p>
            <p class="mt-1 text-sm text-[#67757A]">325 places</p>
          </div>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearches {}
