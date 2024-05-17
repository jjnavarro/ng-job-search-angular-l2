import { Component, inject, OnInit } from '@angular/core';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { CommonModule } from '@angular/common';
import { JobRowComponent } from '../job-row/job-row.component';
import { Job } from '../../models';
import { catchError, EMPTY, of, switchMap, take, tap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, JobRowComponent],
})
export class FavoritesComponent implements OnInit {
  jobsDataService = inject(JobsDataService);
  favoritesIds$ = this.jobsDataService.getFavoritesIds();
  jobs: Job[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getJobs();
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
}
