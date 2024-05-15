import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private favoritesId$: BehaviorSubject<string[] | null> =
  new BehaviorSubject<string[] | null>(null);

  constructor() {}

  getFavoritesIds(): Observable<string[] | null> {
    return this.favoritesId$.asObservable();
  }

  setFavoritesIds(favoritesIds: string[])  {
    this.favoritesId$.next(favoritesIds);
  }
}
