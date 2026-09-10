import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="relative z-30 mx-auto -mt-20 max-w-[1240px] px-4 sm:-mt-24 sm:px-6 lg:-mt-28">
      <div class="rounded-[16px] border border-gray-100/80 bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8">
        <p class="text-lg font-bold text-[#112211] sm:text-xl">Where are you flying?</p>

        <form (submit)="$event.preventDefault()" class="mt-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="relative">
              <label class="absolute -top-2 left-3 z-10 bg-white px-1 text-[11px] font-medium text-[#112211]">
                Enter Destination
              </label>
              <div class="flex h-[56px] items-center rounded-[4px] border border-[#79747E] bg-white px-3 pr-3 transition-colors focus-within:border-[#8DD3BB] focus-within:shadow-[0_0_0_1px_#8DD3BB]">
                <input
                  type="text"
                  [ngModel]="destination()"
                  (ngModelChange)="destination.set($event)"
                  name="destination"
                  class="w-full border-0 bg-transparent text-[15px] font-medium text-[#112211] outline-none placeholder:text-[#6B7280]"
                  placeholder="Enter destination"
                />
              </div>
            </div>

            <div class="relative">
              <label class="absolute -top-2 left-3 z-10 bg-white px-1 text-[11px] font-medium text-[#112211]">
                Check In
              </label>
              <div class="flex h-[56px] items-center rounded-[4px] border border-[#79747E] bg-white px-3 transition-colors focus-within:border-[#8DD3BB] focus-within:shadow-[0_0_0_1px_#8DD3BB]">
                <input
                  type="text"
                  [ngModel]="checkIn()"
                  (ngModelChange)="checkIn.set($event)"
                  name="checkIn"
                  class="w-full border-0 bg-transparent text-[15px] font-medium text-[#112211] outline-none placeholder:text-[#6B7280]"
                  placeholder="Check In"
                />
                <button type="button" class="ml-2 flex h-8 w-8 items-center justify-center rounded-md text-[#112211] transition-colors hover:bg-[#F3F7F5] hover:text-[#112211]" aria-label="Select check-in date">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M0 0h36v36H0z" fill="none"/>
                    <path fill="currentColor" d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6"/>
                    <path fill="currentColor" d="M8 14h2v2H8z"/>
                    <path fill="currentColor" d="M14 14h2v2h-2z"/>
                    <path fill="currentColor" d="M20 14h2v2h-2z"/>
                    <path fill="currentColor" d="M26 14h2v2h-2z"/>
                    <path fill="currentColor" d="M8 19h2v2H8z"/>
                    <path fill="currentColor" d="M14 19h2v2h-2z"/>
                    <path fill="currentColor" d="M20 19h2v2h-2z"/>
                    <path fill="currentColor" d="M26 19h2v2h-2z"/>
                    <path fill="currentColor" d="M8 24h2v2H8z"/>
                    <path fill="currentColor" d="M14 24h2v2h-2z"/>
                    <path fill="currentColor" d="M20 24h2v2h-2z"/>
                    <path fill="currentColor" d="M26 24h2v2h-2z"/>
                    <path fill="currentColor" d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"/>
                    <path fill="currentColor" d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"/>
                    <path fill="currentColor" d="M13 6h10v2H13z"/>
                    <path fill="none" d="M0 0h36v36H0z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="absolute -top-2 left-3 z-10 bg-white px-1 text-[11px] font-medium text-[#112211]">
                Check Out
              </label>
              <div class="flex h-[56px] items-center rounded-[4px] border border-[#79747E] bg-white px-3 transition-colors focus-within:border-[#8DD3BB] focus-within:shadow-[0_0_0_1px_#8DD3BB]">
                <input
                  type="text"
                  [ngModel]="checkOut()"
                  (ngModelChange)="checkOut.set($event)"
                  name="checkOut"
                  class="w-full border-0 bg-transparent text-[15px] font-medium text-[#112211] outline-none placeholder:text-[#6B7280]"
                  placeholder="Check Out"
                />
                <button type="button" class="ml-2 flex h-8 w-8 items-center justify-center rounded-md text-[#112211] transition-colors hover:bg-[#F3F7F5] hover:text-[#112211]" aria-label="Select check-out date">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true">
                    <path d="M0 0h36v36H0z" fill="none"/>
                    <path fill="currentColor" d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6"/>
                    <path fill="currentColor" d="M8 14h2v2H8z"/>
                    <path fill="currentColor" d="M14 14h2v2h-2z"/>
                    <path fill="currentColor" d="M20 14h2v2h-2z"/>
                    <path fill="currentColor" d="M26 14h2v2h-2z"/>
                    <path fill="currentColor" d="M8 19h2v2H8z"/>
                    <path fill="currentColor" d="M14 19h2v2h-2z"/>
                    <path fill="currentColor" d="M20 19h2v2h-2z"/>
                    <path fill="currentColor" d="M26 19h2v2h-2z"/>
                    <path fill="currentColor" d="M8 24h2v2H8z"/>
                    <path fill="currentColor" d="M14 24h2v2h-2z"/>
                    <path fill="currentColor" d="M20 24h2v2h-2z"/>
                    <path fill="currentColor" d="M26 24h2v2h-2z"/>
                    <path fill="currentColor" d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"/>
                    <path fill="currentColor" d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"/>
                    <path fill="currentColor" d="M13 6h10v2H13z"/>
                    <path fill="none" d="M0 0h36v36H0z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="absolute -top-2 left-3 z-10 bg-white px-1 text-[11px] font-medium text-[#112211]">
                Rooms &amp; Guests
              </label>
              <button
                type="button"
                class="flex h-[56px] w-full items-center justify-between rounded-[4px] border border-[#79747E] bg-white px-3 text-left transition-colors hover:border-[#8DD3BB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DD3BB]"
                aria-label="Select room and guest count"
              >
                <div class="flex items-center gap-2 overflow-hidden">
                  <span class="flex h-8 w-8 items-center justify-center rounded-md text-[#112211]">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <g class="bed-outiline">
                        <g fill="currentColor" fill-rule="evenodd" class="Vector" clip-rule="evenodd">
                          <path d="M6 14a2 2 0 0 0-2 2v4a1 1 0 1 1-2 0v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4a1 1 0 1 1-2 0v-4a2 2 0 0 0-2-2z"/>
                          <path d="M2 19a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M6.5 7.75c-.69 0-1.25.56-1.25 1.25v4a.75.75 0 0 1-1.5 0V9A2.75 2.75 0 0 1 6.5 6.25h11A2.75 2.75 0 0 1 20.25 9v4a.75.75 0 0 1-1.5 0V9c0-.69-.56-1.25-1.25-1.25z"/>
                          <path d="M5.75 12A2.25 2.25 0 0 1 8 9.75h2.1A2.25 2.25 0 0 1 12.35 12v1h-1.5v-1a.75.75 0 0 0-.75-.75H8a.75.75 0 0 0-.75.75v1.5h-1.5z"/>
                          <path d="M11.25 12a2.25 2.25 0 0 1 2.25-2.25h2A2.25 2.25 0 0 1 17.75 12v1h-1.5v-1a.75.75 0 0 0-.75-.75h-2a.75.75 0 0 0-.75.75v1h-1.5z"/>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span class="truncate text-[15px] font-medium text-[#112211]">{{ guests() }}</span>
                </div>

                <svg class="h-4 w-4 shrink-0 text-[#112211]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path fill="currentColor" fill-rule="evenodd" d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-8 flex flex-col items-center justify-end gap-6 pt-2 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-[6px] border border-transparent bg-transparent px-4 py-2 text-sm font-semibold text-[#112211] shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8DD3BB] hover:bg-[#8DD3BB]/10 hover:shadow-sm"
            >
              <span class="text-base font-bold">+</span>
              <span>Add Promo Code</span>
            </button>

            <button
              type="button"
              class="motion-rise inline-flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#8DD3BB] px-6 text-sm font-semibold text-[#112211] shadow-sm transition-all hover:bg-[#74C0A3] active:scale-[0.99] sm:w-auto"
            >
              <svg class="h-[18px] w-[18px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M0 0h32v32H0z" fill="none"/>
                <path fill="currentColor" fill-rule="evenodd" d="M21.15 5.02h6.69c.998 0 1.826.776 2.078 1.826c.067.284.077.522-.094.775a.9.9 0 0 1-.744.399H29V30H3V8.02h-.1a.9.9 0 0 1-.755-.416c-.17-.264-.148-.52-.075-.812c.253-1.023 1.07-1.772 2.05-1.772h6.69A5.95 5.95 0 0 1 15.98 2a5.95 5.95 0 0 1 5.17 3.02M10 29.62c0-.34.28-.62.621-.62H11V8.02h-1zM21.379 29H21V8.02h1v21.6c0-.34-.28-.62-.621-.62M15.99 3h.005zM6 21.306v2.383c0 .17-.14.311-.32.311H4.31c-.17 0-.31-.14-.31-.31v-2.384c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m3 0v2.383c0 .17-.14.311-.32.311H7.31c-.17 0-.31-.14-.31-.31v-2.384c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m-3-5.008v2.384c0 .17-.14.31-.32.31H4.31c-.17 0-.31-.14-.31-.31v-2.384c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m3 0v2.384c0 .17-.14.31-.32.31H7.31c-.17 0-.31-.14-.31-.31v-2.384c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m-3-4.987v2.383c0 .17-.14.31-.32.31H4.31c-.17 0-.31-.14-.31-.31V11.31c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m3 0v2.383c0 .17-.14.31-.32.31H7.31c-.17 0-.31-.14-.31-.31V11.31c0-.17.14-.31.31-.31h1.38c.17 0 .31.14.31.31m15.994 9.995v2.383c0 .17-.14.311-.31.311H23.31a.31.31 0 0 1-.311-.31v-2.384c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31m3.006 0v2.383c0 .17-.14.311-.31.311h-1.373a.31.31 0 0 1-.311-.31v-2.384c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31m-3.006-5.008v2.384c0 .17-.14.31-.31.31H23.31a.31.31 0 0 1-.311-.31v-2.384c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31m3.006 0v2.384c0 .17-.14.31-.31.31h-1.373a.31.31 0 0 1-.311-.31v-2.384c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31m-3.006-4.987v2.383c0 .17-.14.31-.31.31H23.31a.31.31 0 0 1-.311-.31V11.31c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31m3.006 0v2.383c0 .17-.14.31-.31.31h-1.373a.31.31 0 0 1-.311-.31V11.31c0-.17.14-.31.31-.31h1.373c.17 0 .311.14.311.31M15 13.31v2.38c0 .17-.14.31-.312.31h-1.376a.31.31 0 0 1-.312-.31v-2.38c0-.17.14-.31.312-.31h1.376c.171 0 .312.14.312.31M15.137 27h-1.774a.365.365 0 0 1-.363-.37v-4.628h2.5v4.629c0 .21-.167.369-.363.369" clip-rule="evenodd"/>
              </svg>
              <span>Show Places</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchForm {
  readonly destination = signal('Istanbul, Turkey');
  readonly checkIn = signal('Fri 12/2');
  readonly checkOut = signal('Sun 12/4');
  readonly guests = signal('1 room, 2 guests');
}
