import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutePaths } from '../../enums/route-path';
import { Job } from '../../models';

@Component({
  selector: 'job-row',
  templateUrl: './job-row.component.html',
  styleUrls: ['./job-row.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class JobRowComponent {
  @Input() job!: Job;
  @Input() isFavorite: boolean = false;
  @Input() showStar: boolean = true;
  @Output() clickStarIcon: EventEmitter<void> = new EventEmitter<void>();

  constructor(private routing: Router) {}

  /**
   * Routing to job detail page where we send job id as path param
   */
  goToDetail(id: number) {
    this.routing.navigate([`${RoutePaths.JOBS}/` + id]);
  }
}
