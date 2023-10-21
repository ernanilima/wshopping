import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findTotalBrands', () => {
    it('should return the total when calling the findTotalBrands method', () => {
      const expected = 31;

      service.findTotalBrands().subscribe((result) => {
        expect(result).toEqual(expected);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/dashboard/total-marcas`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expected);
    });
  });

  describe('findTotalProducts', () => {
    it('should return the total when calling the findTotalProducts method', () => {
      const expected = 32;

      service.findTotalProducts().subscribe((result) => {
        expect(result).toEqual(expected);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/dashboard/total-produtos`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expected);
    });
  });

  describe('findTotalProductsNotFound', () => {
    it('should return the total when calling the findTotalProductsNotFound method', () => {
      const expected = 33;

      service.findTotalProductsNotFound().subscribe((result) => {
        expect(result).toEqual(expected);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/dashboard/total-produtos-nao-encontrados`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expected);
    });
  });
});
