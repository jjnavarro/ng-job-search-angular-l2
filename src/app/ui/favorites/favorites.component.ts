import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { catchError, EMPTY, of, switchMap, take, tap } from 'rxjs';
import { Job } from '../../models';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { JobRowComponent } from '../job-row/job-row.component';

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
}
