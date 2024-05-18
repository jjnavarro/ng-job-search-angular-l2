import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsDataService } from './services/store/jobs-data.service';
import { NavComponent } from './ui/core/nav/nav.component';

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
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getLocalStorageData();
  }

  /**
   * Get data from browser local storage and set data in service
   */
  getLocalStorageData() {
    const items = localStorage.getItem(this.JOBS_ID_STORAGE_KEY);
    if (items && Array.isArray(JSON.parse(items))) {
      this.jobsDataService.setFavoritesIds(JSON.parse(items));
    }
  }
  /**
   * Before close the tab/window save in browser local storage the data saved in service about favorites jobs
   */
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(_event: any) {
    this.subscription.add(
      this.jobsDataService
        .getFavoritesIds()
        .subscribe((jobsIdFavorites: string[] | null) => {
          this.jobsDataService.setFavoritesIds([]);
          localStorage.setItem(
            this.JOBS_ID_STORAGE_KEY,
            JSON.stringify(jobsIdFavorites)
          );
        })
    );
    this.subscription.unsubscribe();
  }
}
