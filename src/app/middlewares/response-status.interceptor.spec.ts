import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToastService } from '../shared/toast/toast.service';
import { MiddlewaresModule } from './middlewares.module';
import { ResponseStatusInterceptor } from './response-status.interceptor';

describe('ResponseStatusInterceptor', () => {
  let interceptor: ResponseStatusInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let toastService: ToastService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MiddlewaresModule, HttpClientTestingModule],
      providers: [
        ResponseStatusInterceptor,
        {
          provide: ToastService,
          useValue: { success: () => of({}), error: () => of({}) },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        interceptor = TestBed.inject(ResponseStatusInterceptor);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        toastService = TestBed.inject(ToastService);
      });
  }));

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('success', () => {
    it('should display a success message for status 200', () => {
      const okData = { message: 'Test success message' };

      spyOn(toastService, 'success');

      httpClient.get('/api/test-success').subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(okData);
        expect(toastService.success).toHaveBeenCalledWith(okData.message);
      });

      const req = httpTestingController.expectOne('/api/test-success');
      req.flush(okData, { status: 200, statusText: 'OK' });

      expect(interceptor).toBeTruthy();
      httpTestingController.verify();
    });

    it('should display a success message for status 299', () => {
      const okData = { message: 'Test success message' };

      spyOn(toastService, 'success');

      httpClient.get('/api/test-success').subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(okData);
        expect(toastService.success).toHaveBeenCalledWith(okData.message);
      });

      const req = httpTestingController.expectOne('/api/test-success');
      req.flush(okData, {
        status: 299,
        statusText: 'Miscellaneous Persistent Warning',
      });

      expect(interceptor).toBeTruthy();
      httpTestingController.verify();
    });
  });

  describe('error', () => {
    it('should display a error message for status 400', () => {
      const errorData = { error: 'Error', message: 'Test error message' };

      spyOn(toastService, 'error');

      httpClient.get('/api/test-error').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(toastService.error).toHaveBeenCalledWith(
            errorData.error,
            errorData.message,
            undefined
          );
        },
      });

      const req = httpTestingController.expectOne('/api/test-error');
      req.flush(errorData, { status: 400, statusText: 'Bad Request' });

      expect(interceptor).toBeTruthy();
      httpTestingController.verify();
    });

    it('should display a error message for status 599', () => {
      const errorData = { error: 'Error', message: 'Test error message' };

      spyOn(toastService, 'error');

      httpClient.get('/api/test-error').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(toastService.error).toHaveBeenCalledWith(
            errorData.error,
            errorData.message,
            undefined
          );
        },
      });

      const req = httpTestingController.expectOne('/api/test-error');
      req.flush(errorData, { status: 599, statusText: 'Unknown Error' });

      expect(interceptor).toBeTruthy();
      httpTestingController.verify();
    });

    it('should display a error message for status 0', () => {
      spyOn(toastService, 'error');

      httpClient.get('/api/test-error').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(toastService.error).toHaveBeenCalledWith(
            'Unknown Error',
            'Sem acesso a API',
            10000
          );
        },
      });

      const req = httpTestingController.expectOne('/api/test-error');
      req.flush(null, { status: 0, statusText: 'Unknown Error' });

      expect(interceptor).toBeTruthy();
      httpTestingController.verify();
    });
  });
});
