import { DatePipe, TitleCasePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TitleCasePipe,
          useValue: {
            transform: () => of({}),
          },
        },
        {
          provide: DatePipe,
          useValue: {
            transform: () => of({}),
          },
        },
      ],
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
