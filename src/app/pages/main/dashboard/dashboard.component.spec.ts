import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from '../../pages.module';
import { ProductDto } from '../../product/model/product.dto';
import { ProductService } from '../../product/service/product.service';
import { DashboardService } from '../service/dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { FormDashboard } from './dashboard.form';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let dashboardService: DashboardService;
  let productService: ProductService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
      providers: [
        FormDashboard,
        {
          provide: DashboardService,
          useValue: {
            findTotalBrands: () => of(),
            findTotalProducts: () => of(),
            findTotalProductsNotFound: () => of(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findProductByBarcode: () => of(),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        dashboardService = TestBed.inject(DashboardService);
        productService = TestBed.inject(ProductService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('observables', () => {
    it('should return the observables values', () => {
      expect(component['_observables']).toHaveSize(4);
      expect(component['_observables']).toEqual([
        { name: 'findTotalBrands', showLoading: false },
        { name: 'findTotalProducts', showLoading: false },
        { name: 'findTotalProductsNotFound', showLoading: false },
        { name: 'findProductByBarcode', showLoading: false },
      ]);
    });
  });

  describe('cardBrand', () => {
    it('should return the cardBrand values', () => {
      expect(component.cardBrand).toEqual({
        routerLink: '/marca',
        title: 'Marcas',
        total: 0,
        icon: 'pi-box',
        iconColor: 'purple',
      });
    });
  });

  describe('cardProduct', () => {
    it('should return the cardProduct values', () => {
      expect(component.cardProduct).toEqual({
        routerLink: '/produto',
        title: 'Produtos',
        total: 0,
        icon: 'pi-shopping-cart',
        iconColor: 'blue',
      });
    });
  });

  describe('cardProductNotFound', () => {
    it('should return the cardProductNotFound values', () => {
      expect(component.cardProductNotFound).toEqual({
        routerLink: '/produto',
        title: 'Produtos não encontrados',
        total: 0,
        icon: 'pi-times-circle',
        iconColor: 'red',
      });
    });
  });

  describe('reloadTotalBrands', () => {
    it('should update the total on cardBrand', () => {
      const componentMock = component as any;

      spyOn(componentMock, '_reloadTotalData').and.callFake(
        (serviceMethod: () => any, callback: (total: number) => void) =>
          callback(11)
      );

      component['_reloadTotalBrands']();

      expect(componentMock._reloadTotalData).toHaveBeenCalledTimes(1);
      expect(component.cardBrand.total).toEqual(11);
    });
  });

  describe('reloadTotalProducts', () => {
    it('should update the total on cardProduct', () => {
      const componentMock = component as any;

      spyOn(componentMock, '_reloadTotalData').and.callFake(
        (serviceMethod: () => any, callback: (total: number) => void) =>
          callback(12)
      );

      component['_reloadTotalProducts']();

      expect(componentMock._reloadTotalData).toHaveBeenCalledTimes(1);
      expect(component.cardProduct.total).toEqual(12);
    });
  });

  describe('reloadTotalProductsNotFound', () => {
    it('should update the total on cardProductNotFound', () => {
      const componentMock = component as any;

      spyOn(componentMock, '_reloadTotalData').and.callFake(
        (serviceMethod: () => any, callback: (total: number) => void) =>
          callback(12)
      );

      component['_reloadTotalProductsNotFound']();

      expect(componentMock._reloadTotalData).toHaveBeenCalledTimes(1);
      expect(component.cardProductNotFound.total).toEqual(12);
    });
  });

  describe('reloadTotalData', () => {
    it('should return the total when calling the findTotalBrands method', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(dashboardService, 'findTotalBrands').and.returnValue(of(21));
      spyOn(componentMock, '_setShowLoading');

      component['_reloadTotalData'](dashboardService.findTotalBrands, (total) =>
        expect(total).toEqual(21)
      );
      expect(dashboardService.findTotalBrands).toHaveBeenCalledTimes(1);
      expect(componentMock._setShowLoading).toHaveBeenCalledTimes(2);
    }));

    it('should return the total when calling the findTotalProducts method', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(dashboardService, 'findTotalProducts').and.returnValue(of(22));
      spyOn(componentMock, '_setShowLoading');

      component['_reloadTotalData'](
        dashboardService.findTotalProducts,
        (total) => expect(total).toEqual(22)
      );
      expect(dashboardService.findTotalProducts).toHaveBeenCalledTimes(1);
      expect(componentMock._setShowLoading).toHaveBeenCalledTimes(2);
    }));

    it('should return the total when calling the findTotalProductsNotFound method', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(dashboardService, 'findTotalProductsNotFound').and.returnValue(
        of(23)
      );
      spyOn(componentMock, '_setShowLoading');

      component['_reloadTotalData'](
        dashboardService.findTotalProductsNotFound,
        (total) => expect(total).toEqual(23)
      );
      expect(dashboardService.findTotalProductsNotFound).toHaveBeenCalledTimes(
        1
      );
      expect(componentMock._setShowLoading).toHaveBeenCalledTimes(2);
    }));
  });

  describe('findProductByBarcode', () => {
    it('should not call the findProductByBarcode method because there is no value to search for', () => {
      const componentMock = component as any;

      componentMock._barcode = {
        nativeElement: { value: '' },
      };

      spyOn(productService, 'findProductByBarcode');
      spyOn(componentMock, '_setShowLoading');
      spyOn(componentMock, '_reloadTotalProductsNotFound');

      component.findProductByBarcode();

      expect(productService.findProductByBarcode).not.toHaveBeenCalled();
      expect(componentMock._setShowLoading).not.toHaveBeenCalled();
      expect(componentMock._reloadTotalProductsNotFound).not.toHaveBeenCalled();
    });

    it('should call the findProductByBarcode method and return the product', fakeAsync(() => {
      const componentMock = component as any;

      const product = {
        id: '84a34074-325e-4ee6-9066-b40b4b1e6948',
        barcode: '7891020300000',
        description: 'Test Descript Product',
        brand: {
          description: 'Test Descript Brand',
        },
        created_at: '2023-10-10T20:55:44.245Z',
      } as ProductDto;

      componentMock.openDialogResultProduct = false;
      component.form.controls['barcode'].setValue('789102030');

      spyOn(productService, 'findProductByBarcode').and.returnValue(
        of(product)
      );
      spyOn(componentMock, '_setShowLoading');
      spyOn(componentMock, '_reloadTotalProductsNotFound');

      component.findProductByBarcode();

      expect(productService.findProductByBarcode).toHaveBeenCalledTimes(1);
      expect(componentMock.product).toEqual(product);
      expect(componentMock.openDialogResultProduct).toBeTruthy();
      expect(componentMock._setShowLoading).toHaveBeenCalledTimes(2);
      expect(componentMock._reloadTotalProductsNotFound).not.toHaveBeenCalled();
    }));

    it('should call the findProductByBarcode method and return an error', fakeAsync(() => {
      const componentMock = component as any;

      componentMock.openDialogResultProduct = false;
      component.form.controls['barcode'].setValue('789102030');

      spyOn(productService, 'findProductByBarcode').and.returnValue(
        throwError(() => new Error('Error'))
      );
      spyOn(componentMock, '_setShowLoading');
      spyOn(componentMock, '_reloadTotalProductsNotFound');

      component.findProductByBarcode();

      expect(productService.findProductByBarcode).toHaveBeenCalledTimes(1);
      expect(componentMock.product).toBeUndefined();
      expect(componentMock.openDialogResultProduct).toBeFalsy();
      expect(componentMock._setShowLoading).toHaveBeenCalledTimes(2);
      expect(componentMock._reloadTotalProductsNotFound).toHaveBeenCalledTimes(
        1
      );
    }));
  });
});
