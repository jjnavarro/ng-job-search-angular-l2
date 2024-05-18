import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { JobsDataService } from './services/store/jobs-data.service';
/**
 * Add withComponentInputBinding (to pass path params as input in component) and JobsDataService (to save data)
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), JobsDataService],
};
