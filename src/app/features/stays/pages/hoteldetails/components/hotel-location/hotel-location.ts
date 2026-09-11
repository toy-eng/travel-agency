import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hoteldetails-location',
  standalone: true,
  templateUrl: './hotel-location.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelLocationComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly address = signal('Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437');
  readonly mapsUrl = signal(
    'https://www.google.com/maps/search/?api=1&query=CVK+Park+Bosphorus+Hotel+Istanbul',
  );

  private readonly mapEmbedUrl =
    'https://www.openstreetmap.org/export/embed.html?bbox=28.9600%2C41.0200%2C29.0200%2C41.0550&layer=mapnik&marker=41.0370%2C28.9850';

  readonly safeMapEmbedUrl = signal<SafeResourceUrl>(
    this.sanitizer.bypassSecurityTrustResourceUrl(this.mapEmbedUrl),
  );
}
