import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../models';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoutePaths } from '../../enums/route-path';

@Component({
  selector: 'job-row',
  templateUrl: './job-row.component.html',
  styleUrls: ['./job-row.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class JobRowComponent {
  @Input() job!: Job;
  @Input() isFavorite: boolean = false;
  @Input() showStar: boolean = true;
  @Output() clickStarIcon: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(private routing: Router) { }

  goToDetail(id: number) {
    if (!this.showStar) {
      return;
    }
    this.routing.navigate([`${RoutePaths.JOBS}/`+id]);
  }

}
