import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptors';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    //enables http transfer cache and allows hydration of our component
    provideClientHydration(
      //withHttpTransferCacheOptions fine-tunes the transfer cache. For example, excluding certain endpoints or caching requests that carry auth headers
      //   withHttpTransferCacheOptions(
      //   {
      //     includePostRequests: false,
      //     includeRequestsWithAuthHeaders: false
      //   }
      // )
      withEventReplay(),
    ),
    provideAnimations(),
    //tells Angular's HttpClient to use the modern fetch API (recommended for SSR environments).
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
