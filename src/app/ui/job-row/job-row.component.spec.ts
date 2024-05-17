/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobRowComponent } from './job-row.component';

describe('JobRowComponent', () => {
  let component: JobRowComponent;
  let fixture: ComponentFixture<JobRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
