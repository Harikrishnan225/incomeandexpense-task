import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatPaginatorModule} from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideClientHydration(),
      provideAnimationsAsync(),
      importProvidersFrom(MatPaginatorModule)
    ]
};
