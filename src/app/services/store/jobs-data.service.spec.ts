/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobsDataService } from './jobs-data.service';

describe('Service: JobsData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobsDataService]
    });
  });

  it('should ...', inject([JobsDataService], (service: JobsDataService) => {
    expect(service).toBeTruthy();
  }));
});
