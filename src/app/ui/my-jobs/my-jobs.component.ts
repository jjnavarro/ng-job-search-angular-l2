import { Component, inject, OnInit } from '@angular/core';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Job } from '../../models';
import { catchError, EMPTY, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class MyJobsComponent implements OnInit {

  jobsDataService = inject(JobsDataService);
  favoritesIds$ = this.jobsDataService.getFavoritesIds();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.httpClient.get<Job[]>('/jobs')
    .pipe(
      tap((jobsResponse: Job[]) => {
        console.table(jobsResponse);
        this.jobsDataService.setFavoritesIds(['1']);
      }),
      catchError(err => {
        console.table(err);
        return EMPTY;
      }),
    ).subscribe();
  }

}
