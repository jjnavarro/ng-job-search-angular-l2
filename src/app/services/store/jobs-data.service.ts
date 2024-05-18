import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private favoritesId$: BehaviorSubject<string[] | null> = new BehaviorSubject<
    string[] | null
  >(null);

  private jobs$: BehaviorSubject<Job[] | null> = new BehaviorSubject<
    Job[] | null
  >(null);

  getFavoritesIds(): Observable<string[] | null> {
    return this.favoritesId$.asObservable();
  }

  setFavoritesIds(favoritesIds: string[]) {
    this.favoritesId$.next(favoritesIds);
  }

  getJobs(): Observable<Job[] | null> {
    return this.jobs$.asObservable();
  }

  setJobs(jobs: Job[]) {
    this.jobs$.next(jobs);
  }
}
