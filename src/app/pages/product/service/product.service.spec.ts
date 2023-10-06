import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

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
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
