import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
