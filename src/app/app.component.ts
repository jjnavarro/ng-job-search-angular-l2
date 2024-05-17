import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './ui/core/nav/nav.component';
import { JobsDataService } from './services/store/jobs-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-job-search';

  jobsDataService = inject(JobsDataService);
  readonly JOBS_ID_STORAGE_KEY = 'jobsIdFavorites';

  ngOnInit() {
    this.getLocatStorageData();
  }

  getLocatStorageData() {
    const items = localStorage.getItem(this.JOBS_ID_STORAGE_KEY);
    if (items && Array.isArray(JSON.parse(items))) {
      this.jobsDataService.setFavoritesIds(JSON.parse(items));
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(_event: any) {
    this.jobsDataService
      .getFavoritesIds()
      .subscribe((jobsIdFavorites: string[] | null) => {
        localStorage.setItem(
          this.JOBS_ID_STORAGE_KEY,
          JSON.stringify(jobsIdFavorites)
        );
      });
  }
}
