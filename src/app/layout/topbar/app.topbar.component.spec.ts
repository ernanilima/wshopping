import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTopbarComponent } from './app.topbar.component';
import { LayoutModule } from '../layout.module';
import { ActivatedRoute } from '@angular/router';

describe('AppTopbarComponent', () => {
  let component: AppTopbarComponent;
  let fixture: ComponentFixture<AppTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppTopbarComponent],
      imports: [LayoutModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    });
    fixture = TestBed.createComponent(AppTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
