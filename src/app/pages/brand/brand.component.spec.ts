import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from '../pages.module';
import { BrandComponent } from './brand.component';
import { BrandService } from './service/brand.service';

const brands = [
  {
    id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
    code: 101,
    description: 'Test Descript 1',
    total_products: 10,
    created_at: '10/11/2023 13:14',
  },
  {
    id: '112bf017-9794-400d-802c-01b929f2a8f7',
    code: 102,
    description: 'Test Descript 2',
    total_products: 20,
    created_at: '20/12/2023 14:15',
  },
];

const brandsPage = {
  content: brands,
  totalPages: 0,
  totalElements: brands.length,
  size: 10,
  page: 0,
  numberOfElements: brands.length,
};

const httpResponse = {
  body: {
    message: 'Message',
    data: {
      id: '8350aab2-5d99-430f-ab91-d8e851a285bb',
      code: 101,
      description: 'Test Descript 1',
      total_products: 10,
      created_at: '2023-11-10T13:14:15.059832545Z',
    },
  },
};

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  let service: BrandService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrandComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
      providers: [
        {
          provide: BrandService,
          useValue: {
            findAllBrands: () => of(),
            findAllBrandsByDescription: () => of(),
            delete: () => of(),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BrandComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(BrandService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('findBrands', () => {
    it('should call findAllBrands method because there is no filter', () => {
      const componentMock = component as any;

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'code',
        sortOrder: -1,
        filters: {},
      };

      spyOn(componentMock, '_findAllBrands');
      spyOn(componentMock, '_findAllBrandsByDescription');

      component.findBrands(tableLazyLoadEvent);

      expect(componentMock._findAllBrands).toHaveBeenCalled();
      expect(componentMock._findAllBrandsByDescription).not.toHaveBeenCalled();
    });

    it('should call findAllBrands method because the filter has a null value', () => {
      const componentMock = component as any;

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'code',
        sortOrder: -1,
        filters: { global: { value: null as any, matchMode: 'contains' } },
      };

      spyOn(componentMock, '_findAllBrands');
      spyOn(componentMock, '_findAllBrandsByDescription');

      component.findBrands(tableLazyLoadEvent);

      expect(componentMock._findAllBrands).toHaveBeenCalled();
      expect(componentMock._findAllBrandsByDescription).not.toHaveBeenCalled();
    });

    it('should call findAllBrands method because the filter has no value', () => {
      const componentMock = component as any;

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'code',
        sortOrder: -1,
        filters: { global: { matchMode: 'contains' } },
      };

      spyOn(componentMock, '_findAllBrands');
      spyOn(componentMock, '_findAllBrandsByDescription');

      component.findBrands(tableLazyLoadEvent);

      expect(componentMock._findAllBrands).toHaveBeenCalled();
      expect(componentMock._findAllBrandsByDescription).not.toHaveBeenCalled();
    });

    it('should call findAllBrandsByDescription method because it has a filter', () => {
      const componentMock = component as any;

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'code',
        sortOrder: -1,
        filters: { global: { value: 'descr', matchMode: 'contains' } },
      };

      spyOn(componentMock, '_findAllBrandsByDescription');
      spyOn(componentMock, '_findAllBrands');

      component.findBrands(tableLazyLoadEvent);

      expect(componentMock._findAllBrandsByDescription).toHaveBeenCalled();
      expect(componentMock._findAllBrands).not.toHaveBeenCalled();
    });
  });

  describe('findAllBrands', () => {
    it('should return the brands when calling the findAllBrands method', fakeAsync(() => {
      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'findAllBrands').and.returnValue(of(brandsPage));

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'code',
        sortOrder: -1,
        filters: {},
      };

      component['_findAllBrands'](tableLazyLoadEvent);

      expect(service.findAllBrands).toHaveBeenCalledTimes(1);
      expect(service.findAllBrands).toHaveBeenCalledWith(
        jasmine.objectContaining({
          pageQuery: { sort: 'code,desc', pageNumber: 0, pageSize: 10 },
        })
      );
      expect(component.brands).toEqual(brandsPage);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    }));

    it('should return null when calling the findAllBrands method and it returns an error', fakeAsync(() => {
      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'findAllBrands').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const tableLazyLoadEvent = {
        first: 50,
        rows: 25,
        sortField: 'description',
        sortOrder: 1,
        filters: {},
      };

      component['_findAllBrands'](tableLazyLoadEvent);

      expect(service.findAllBrands).toHaveBeenCalledTimes(1);
      expect(service.findAllBrands).toHaveBeenCalledWith(
        jasmine.objectContaining({
          pageQuery: { sort: 'description,asc', pageNumber: 2, pageSize: 25 },
        })
      );
      expect(component.brands).toBeNull();
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    }));
  });

  describe('findAllBrandsByDescription', () => {
    it('should return the brands when calling the findAllBrandsByDescription method with filtes', () => {
      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'findAllBrandsByDescription').and.returnValue(
        of(brandsPage)
      );

      const tableLazyLoadEvent = {
        first: 0,
        rows: 10,
        sortField: 'total_products',
        sortOrder: -1,
        filters: { global: { value: 'descr', matchMode: 'contains' } },
      };

      component['_findAllBrandsByDescription'](tableLazyLoadEvent);

      expect(service.findAllBrandsByDescription).toHaveBeenCalledTimes(1);
      expect(service.findAllBrandsByDescription).toHaveBeenCalledWith(
        tableLazyLoadEvent.filters.global.value,
        jasmine.objectContaining({
          pageQuery: {
            sort: 'total_products,desc',
            pageNumber: 0,
            pageSize: 10,
          },
        })
      );
      expect(component.brands).toEqual(brandsPage);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    });

    it('should return null when calling the findAllBrandsByDescription method with filtes and it returns an error', () => {
      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'findAllBrandsByDescription').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const tableLazyLoadEvent = {
        first: 50,
        rows: 25,
        sortField: 'created_at',
        sortOrder: 1,
        filters: { global: { value: 'descr', matchMode: 'contains' } },
      };

      component['_findAllBrandsByDescription'](tableLazyLoadEvent);

      expect(service.findAllBrandsByDescription).toHaveBeenCalledTimes(1);
      expect(service.findAllBrandsByDescription).toHaveBeenCalledWith(
        tableLazyLoadEvent.filters.global.value,
        jasmine.objectContaining({
          pageQuery: {
            sort: 'created_at,asc',
            pageNumber: 2,
            pageSize: 25,
          },
        })
      );
      expect(component.brands).toBeNull();
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('registerItem', () => {
    it('should define brand to null and open the dialog', () => {
      component.showDialog = false;
      component.brand = brands[0];

      expect(component.showDialog).toBeFalsy();
      expect(component.brand).toEqual(brands[0]);

      component.registerItem();

      expect(component.showDialog).toBeTruthy();
      expect(component.brand).toBeNull();
    });
  });

  describe('editItem', () => {
    it('should define brand as the same as the one passed by parameter and open the dialog', () => {
      component.showDialog = false;
      component.brand = null;

      expect(component.showDialog).toBeFalsy();
      expect(component.brand).toBeNull();

      component.editItem(brands[0]);

      expect(component.showDialog).toBeTruthy();
      expect(component.brand).toEqual(brands[0]);
    });
  });

  describe('deleteItem', () => {
    it('should delete a brand passed by parameter', fakeAsync(() => {
      component.brands = {
        content: brands,
        totalPages: 0,
        totalElements: brands.length,
        size: 10,
        page: 0,
        numberOfElements: brands.length,
      };

      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'delete').and.returnValue(of(httpResponse as any));

      component.deleteItem(brands[0]);

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(brands[0]);
      expect(component.brands.content).toHaveSize(1);
      expect(component.brands.content).not.toContain(brands[0]);
      expect(component.brands.content).toContain(brands[1]);
      expect(component.brands.size).toEqual(9);
      expect(component.brands.totalElements).toEqual(1);
      expect(component.brands.content).toEqual([brands[1]]);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    }));

    it('should not delete a brand passed by parameter if an error occurs', fakeAsync(() => {
      component.brands = brandsPage;

      const loadingSpy = spyOn(component.$loading, 'next');
      spyOn(service, 'delete').and.returnValue(
        throwError(() => new Error('Error'))
      );

      component.deleteItem(brands[0]);

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(brands[0]);
      expect(component.brands).toEqual(brandsPage);
      expect(loadingSpy).toHaveBeenCalledTimes(2);
    }));
  });

  describe('selectItem', () => {
    it('should emit onSelectedBrand when calling the selectItem method', () => {
      component.isToSelectBrand = true;

      spyOn(component.onSelectedBrand, 'emit');

      expect(component.isToSelectBrand).toBeTruthy();

      component.selectItem(brands[0]);

      expect(component.isToSelectBrand).toBeFalsy();
      expect(component.onSelectedBrand.emit).toHaveBeenCalledTimes(1);
      expect(component.onSelectedBrand.emit).toHaveBeenCalledWith(brands[0]);
    });
  });

  describe('save', () => {
    it('should emit reloadTable when calling the save method', () => {
      const reloadTableSpy = spyOn(component.$reloadTable, 'next');

      component.save();

      expect(reloadTableSpy).toHaveBeenCalledTimes(1);
      expect(reloadTableSpy).toHaveBeenCalledWith(true);
    });
  });
});
