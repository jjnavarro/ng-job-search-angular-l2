import { Component, inject, OnInit } from '@angular/core';
import { JobsDataService } from '../../services/store/jobs-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {

  jobsDataService = inject(JobsDataService);
  favoritesIds$ = this.jobsDataService.getFavoritesIds();

  constructor() { }

  ngOnInit() {
  }

}
