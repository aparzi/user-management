import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {AuthService} from './pages/auth/services/auth.service';

export function appInitializerFactory() {
  const authService: AuthService = inject(AuthService);
  return authService.getUserLogged();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(appInitializerFactory)
  ]
};
