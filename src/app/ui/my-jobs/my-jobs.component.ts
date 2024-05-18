import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  EMPTY,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Job } from '../../models';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { JobRowComponent } from '../job-row/job-row.component';

@Component({
  selector: 'my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, JobRowComponent],
})
export class MyJobsComponent implements OnInit, OnDestroy {
  jobsDataService = inject(JobsDataService);
  favoritesIds: string[] = [];
  jobs: Job[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getJobs();
    this.getFavoritesId();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Get array with favorite jobs IDs
   */
  getFavoritesId() {
    this.subscription.add(
      this.jobsDataService
        .getFavoritesIds()
        .subscribe((jobsIdFavorites: string[] | null) => {
          this.favoritesIds = jobsIdFavorites ?? [];
        })
    );
  }

  /**
   * Get jobs
   * if the service doesn't data saved then we make http request and save the response
   * if the service has data saved then we don't make a http request because recover and use data saved in service
   */
  getJobs() {
    this.jobsDataService
      .getJobs()
      .pipe(
        take(1),
        switchMap((jobs) => {
          if (jobs) {
            return of(jobs);
          }
          return this.httpClient.get<Job[]>('/jobs').pipe(
            tap((jobsResponse: Job[]) => {
              this.jobsDataService.setJobs(jobsResponse);
            }),
            catchError((_err) => EMPTY)
          );
        }),
        tap((jobs) => {
          this.jobs = jobs;
        })
      )
      .subscribe();
  }

  /**
   * Add favorite to favoriteId array
   * If the ID exist in the array then we delete this job from favorite list
   * If the ID NOT exist in the array we push this job to favorite list
   */
  addFavoriteJob(id: string) {
    if (id === '') {
      return;
    }
    if (this.favoritesIds.includes(id)) {
      this.favoritesIds = this.favoritesIds.filter((value) => value !== id);
    } else {
      this.favoritesIds.push(id);
    }
    this.jobsDataService.setFavoritesIds(this.favoritesIds);
  }
}
