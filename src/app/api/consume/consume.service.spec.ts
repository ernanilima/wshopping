import { TestBed } from '@angular/core/testing';
import { ConsumeService } from './consume.service';
import SpyObj = jasmine.SpyObj;

describe('ConsumeService', () => {
  let consumeServiceMock: SpyObj<ConsumeService>;

  beforeEach(() => {
    consumeServiceMock = jasmine.createSpyObj('consumeServiceMock', [
      'getUrlToApi',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConsumeService,
          useValue: consumeServiceMock,
        },
      ],
    });
  });

  it('should be created', () => {
    expect(consumeServiceMock).toBeTruthy();
  });
});
