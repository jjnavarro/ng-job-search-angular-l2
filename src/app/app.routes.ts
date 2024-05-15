import { Routes } from '@angular/router';
import { DEFAULT_ROUTE, RoutePaths } from './enums/route-path';
import { PATH_PARAM_JOB_ID } from './constants';
import { FavoritesComponent } from './ui/favorites/favorites.component';

export const routes: Routes = [
  {
    path: RoutePaths.EMPTY,
    redirectTo: DEFAULT_ROUTE,
    pathMatch: 'full',
  },
  {
    path: `${RoutePaths.JOBS}`,
    loadComponent: () =>
      import('./ui/my-jobs/my-jobs.component').then((c) => c.MyJobsComponent),
  },
  {
    path: `${RoutePaths.JOBS}/:${PATH_PARAM_JOB_ID}`,
    loadComponent: () =>
      import('./ui/job-details/job-details.component').then(
        (c) => c.JobDetailsComponent
      ),
  },
  {
    path: `${RoutePaths.FAVORITES}`,
    loadComponent: () =>
      import('./ui/favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      ),
  },
  { path: RoutePaths.WILDCARD, redirectTo: DEFAULT_ROUTE },
];
