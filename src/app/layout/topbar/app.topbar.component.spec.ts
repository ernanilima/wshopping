import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LayoutModule } from '../layout.module';
import { AppTopbarComponent } from './app.topbar.component';

describe('AppTopbarComponent', () => {
  let component: AppTopbarComponent;
  let fixture: ComponentFixture<AppTopbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppTopbarComponent],
      imports: [LayoutModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppTopbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.applicationName).toEqual('WShopping');
  });
});
