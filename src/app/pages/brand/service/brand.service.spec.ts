import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FilterService } from 'src/app/shared/services/filter.service';
import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: FilterService,
          useValue: jasmine.createSpyObj('filterServiceMock', ['']),
        },
      ],
    });
    service = TestBed.inject(BrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
