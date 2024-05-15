import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { JobsDataService } from './services/store/jobs-data.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), JobsDataService],
};
