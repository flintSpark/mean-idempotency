import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Added this line
import { routes } from './app.routes';
import { idempotencyInterceptor } from './idempotency.interceptor'; // Added this line

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([idempotencyInterceptor]) // Wires your interceptor into Angular's network pipeline
    )
  ]
};
