import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiModule } from '../api.module';
import { ConsumeComponent } from './consume.component';
import { ConsumeService } from './consume.service';

const routeMock = {
  url: '/api',
};

const activatedRouteMock = {
  snapshot: {
    root: {
      firstChild: {
        routeConfig: { path: 'api' },
      },
    },
  },
};

const consumeServiceMock = {
  getUrlToApi(): any {
    return of('http://gshopping-api.com');
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
          provide: Router,
          useValue: routeMock,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: ConsumeService,
          useValue: consumeServiceMock,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsumeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('urlToApi', () => {
    it('should get the URL for API', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(componentMock._service, 'getUrlToApi').and.callThrough();
      spyOn(console, 'log');

      componentMock.urlToApi();

      fixture.whenStable().then(() => {
        expect(componentMock._service.getUrlToApi).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(
          'url completa',
          'http://gshopping-api.com'
        );
      });
    }));
  });
});
