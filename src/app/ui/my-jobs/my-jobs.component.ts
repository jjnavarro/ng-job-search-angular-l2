import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Job } from '../../models';
import {
  catchError,
  EMPTY,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
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

  getFavoritesId() {
    this.subscription.add(
      this.jobsDataService
        .getFavoritesIds()
        .subscribe((jobsIdFavorites: string[] | null) => {
          this.favoritesIds = jobsIdFavorites ?? [];
        })
    );
  }

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
        tap(jobs => {
          this.jobs = jobs;
        })
      )
      .subscribe();
  }

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
