import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarComponent } from './app.sidebar.component';
import { LayoutModule } from '../layout.module';
import { ActivatedRoute } from '@angular/router';

describe('AppSidebarComponent', () => {
  let component: AppSidebarComponent;
  let fixture: ComponentFixture<AppSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSidebarComponent],
      imports: [LayoutModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    });
    fixture = TestBed.createComponent(AppSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
