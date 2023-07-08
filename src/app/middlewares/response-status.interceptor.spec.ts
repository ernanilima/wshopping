import { TestBed } from '@angular/core/testing';

import { ResponseStatusInterceptor } from './response-status.interceptor';

describe('ResponseStatusInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ResponseStatusInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ResponseStatusInterceptor = TestBed.inject(
      ResponseStatusInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
