import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {MatDialogModule} from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimationsAsync(),
    importProvidersFrom(MatDialogModule),
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]};
