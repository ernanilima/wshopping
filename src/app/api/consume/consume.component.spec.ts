import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumeComponent } from './consume.component';
import { ActivatedRoute } from '@angular/router';
import { ApiModule } from '../api.module';
import { ConsumeService } from './consume.service';
import { of } from 'rxjs';

const consumeServiceMock = {
  getUrlToApi(): any {
    return of('http://gshopping-api.com');
  },
};

const activatedRouteMock = {
  snapshot: {
    root: {
      firstChild: {
        routeConfig: { path: 'some-path' },
      },
    },
  },
};

describe('ConsumeComponent', () => {
  let component: ConsumeComponent;
  let fixture: ComponentFixture<ConsumeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumeComponent],
      imports: [ApiModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: ConsumeService,
          useValue: consumeServiceMock,
        },
      ],
    });
    fixture = TestBed.createComponent(ConsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
