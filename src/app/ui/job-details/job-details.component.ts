import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input as RouteParams, } from '@angular/core';
import { Job } from '../../models';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [HttpClientModule]
})
export class JobDetailsComponent implements OnInit {

  @RouteParams() jobId = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getJobDetail();
  }

  getJobDetail() {
    this.httpClient.get<Job>('/jobs/'+this.jobId)
    .pipe(
      tap((jobsResponse: Job) => {
        console.table(jobsResponse);
      }),
      catchError(err => {
        console.table(err);
        return EMPTY;
      }),
    ).subscribe();
  }
}