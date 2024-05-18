import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input as RouteParams } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { Job } from '../../models';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, SanitizeHtmlPipe],
})
export class JobDetailsComponent implements OnInit {
  @RouteParams() jobId = '';
  job!: Job;

  constructor(private httpClient: HttpClient, private location: Location) {}

  ngOnInit() {
    this.getJobDetail();
  }

  /**
   * HTTP Request to get job detail information with jobId received
   */
  getJobDetail() {
    this.httpClient
      .get<Job>('/jobs/' + this.jobId)
      .pipe(
        tap((jobsResponse: Job) => {
          this.job = jobsResponse;
        }),
        catchError((_err) => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  goBack() {
    this.location.back();
  }
}
