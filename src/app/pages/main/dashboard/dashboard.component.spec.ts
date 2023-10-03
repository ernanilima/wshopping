import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from '../../pages.module';
import { ProductService } from '../../product/service/product.service';
import { DashboardService } from '../service/dashboard.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            findTotalBrands: () => of({}),
            findTotalProducts: () => of({}),
            findTotalProductsNotFound: () => of({}),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findProductByBarcode: () => of({}),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
