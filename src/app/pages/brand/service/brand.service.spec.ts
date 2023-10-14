import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PageParams } from 'src/app/shared/params/page-params';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { BrandDto } from '../model/brand.dto';
import { BrandService } from './brand.service';

const pageParams = PageParams.of({
  sortOrder: -1,
  sortField: 'code',
  first: 0,
  rows: 10,
});

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterService, TitleCasePipe, DatePipe],
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should register a brand', () => {
      const resource = {
        description: 'Test Descript',
      };
      const expected = {
        message: 'Inserted successfully',
        data: {
          id: 'd8468e4f-9319-43d2-990b-a7292cf9831d',
          code: 0,
          description: resource.description,
          total_products: 0,
          created_at: '2023-12-12T13:14:15.059832545Z',
        },
      };

      service.register(resource as BrandDto).subscribe((result) => {
        const body = result.body as { message: string; data: any };
        expect(body.message).toEqual(expected.message);
        expect(body.data).toEqual(expected.data);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/v1/marca`);
      expect(req.request.method).toEqual('POST');
      req.flush(expected);
    });
  });

  describe('edit', () => {
    it('should edit a brand', () => {
      const resource = {
        id: 'd8468e4f-9319-43d2-990b-a7292cf9831d',
        code: 101,
        description: 'Test Descript',
      };
      const expected = {
        message: 'Edited successfully',
        data: {
          id: resource.id,
          code: resource.code,
          description: resource.description,
          total_products: 0,
          created_at: '2023-12-12T13:14:15.059832545Z',
        },
      };

      service.edit(resource as BrandDto).subscribe((result) => {
        const body = result.body as { message: string; data: any };
        expect(body.message).toEqual(expected.message);
        expect(body.data).toEqual(expected.data);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/marca/${resource.id}`
      );
      expect(req.request.method).toEqual('PUT');
      req.flush(expected);
    });
  });

  describe('delete', () => {
    it('should delete a brand', () => {
      const resource = {
        id: 'd8468e4f-9319-43d2-990b-a7292cf9831d',
      };
      const expected = {
        message: 'Successfully deleted',
        data: {
          id: resource.id,
          code: 101,
          description: 'Test Descript',
          total_products: 0,
          created_at: '2023-12-12T13:14:15.059832545Z',
        },
      };

      service.delete(resource as BrandDto).subscribe((result) => {
        const body = result.body as { message: string; data: any };
        expect(body.message).toEqual(expected.message);
        expect(body.data).toEqual(expected.data);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/marca/${resource.id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(expected);
    });
  });

  describe('findAllBrands', () => {
    it('should find all brands and convert the description and date', () => {
      const resource = {
        content: [
          {
            id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
            code: 101,
            description: 'Test DeScRiPt 1',
            total_products: 10,
            created_at: '2023-11-10T13:14:15.059832545Z',
          },
          {
            id: '112bf017-9794-400d-802c-01b929f2a8f7',
            code: 102,
            description: 'Test DeScRiPt 2',
            total_products: 20,
            created_at: '2023-12-20T14:15:16.059832545Z',
          },
        ],
        totalPages: 0,
        totalElements: 2,
        size: 10,
        page: 0,
        numberOfElements: 2,
      };

      const expected = {
        content: [
          {
            id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
            code: 101,
            description: 'Test Descript 1',
            total_products: 10,
            created_at: '10/11/2023 13:14',
          },
          {
            id: '112bf017-9794-400d-802c-01b929f2a8f7',
            code: 102,
            description: 'Test Descript 2',
            total_products: 20,
            created_at: '20/12/2023 14:15',
          },
        ],
        totalPages: 0,
        totalElements: 2,
        size: 10,
        page: 0,
        numberOfElements: 2,
      };

      service.findAllBrands(pageParams).subscribe((result) => {
        expect(result).toEqual(expected);
      });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/marca?sort=code,desc&page=0&size=10`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(resource);
    });
  });

  describe('findAllBrandsByDescription', () => {
    it('should find all brands by description and convert the description and date', () => {
      const resource = {
        content: [
          {
            id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
            code: 101,
            description: 'Test DeScRiPt 1',
            total_products: 10,
            created_at: '2023-11-10T13:14:15.059832545Z',
          },
          {
            id: '112bf017-9794-400d-802c-01b929f2a8f7',
            code: 102,
            description: 'Test DeScRiPt 2',
            total_products: 20,
            created_at: '2023-12-20T14:15:16.059832545Z',
          },
        ],
        totalPages: 0,
        totalElements: 2,
        size: 10,
        page: 0,
        numberOfElements: 2,
      };

      const expected = {
        content: [
          {
            id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
            code: 101,
            description: 'Test Descript 1',
            total_products: 10,
            created_at: '10/11/2023 13:14',
          },
          {
            id: '112bf017-9794-400d-802c-01b929f2a8f7',
            code: 102,
            description: 'Test Descript 2',
            total_products: 20,
            created_at: '20/12/2023 14:15',
          },
        ],
        totalPages: 0,
        totalElements: 2,
        size: 10,
        page: 0,
        numberOfElements: 2,
      };

      const descriptionToSearch = 'descr';

      service
        .findAllBrandsByDescription(descriptionToSearch, pageParams)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });

      const req = httpMock.expectOne(
        `${environment.baseUrl}/v1/marca/descricao/${descriptionToSearch}?sort=code,desc&page=0&size=10`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(resource);
    });
  });
});
