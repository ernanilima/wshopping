import { TestBed } from '@angular/core/testing';

import { ResponseStatusInterceptor } from './response-status.interceptor';
import { MiddlewaresModule } from './middlewares.module';

describe('ResponseStatusInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ResponseStatusInterceptor],
      imports: [MiddlewaresModule],
    })
  );

  it('should be created', () => {
    const interceptor: ResponseStatusInterceptor = TestBed.inject(
      ResponseStatusInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
