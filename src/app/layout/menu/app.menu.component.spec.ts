import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuComponent } from './app.menu.component';
import { LayoutModule } from '../layout.module';
import { ActivatedRoute } from '@angular/router';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppMenuComponent],
      imports: [LayoutModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    });
    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
