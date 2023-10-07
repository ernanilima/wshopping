import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConsumeService } from './consume.service';

describe('ConsumeService', () => {
  let service: ConsumeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConsumeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUrlToApi', () => {
    it('should get the URL for API', () => {
      const apiJsonMock = { url: 'http://gshopping-api.com' };

      service.getUrlToApi().subscribe((url) => {
        expect(url).toBe('http://gshopping-api.com');
      });

      const req = httpMock.expectOne('assets/api.json');
      req.flush(apiJsonMock);
    });
  });
});
