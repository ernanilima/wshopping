import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { ProductDto } from 'src/app/pages/product/model/product.dto';
import { ResultProductComponent } from './result-product.component';

const product = {
  id: '84a34074-325e-4ee6-9066-b40b4b1e6948',
  barcode: '7891020300000',
  description: 'Test Descript Product',
  brand: {
    description: 'Test Descript Brand',
  },
  created_at: '2023-10-10T20:55:44.245Z',
} as ProductDto;

describe('ResultProductComponent', () => {
  let component: ResultProductComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ResultProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResultProductComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ResultProductComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        component.product = product;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('html', () => {
    it('should contain the existing barcode on the product', () => {
      const el = debugElement.query(By.css('#barcode'));
      const codigoBarras = el.nativeElement;

      const barcode = '7891020300000';

      expect(component.product.barcode).toEqual(barcode);
      expect(codigoBarras.value).toEqual(barcode);
    });

    it('should contain the existing productDescription on the product', () => {
      const el = debugElement.query(By.css('#productDescription'));
      const descricaoProduto = el.nativeElement;

      const productDescription = 'Test Descript Product';

      expect(component.product.description).toEqual(productDescription);
      expect(descricaoProduto.value).toEqual(productDescription);
    });

    it('should contain the existing brandDescription on the product', () => {
      const el = debugElement.query(By.css('#brandDescription'));
      const descricaoMarca = el.nativeElement;

      const brandDescription = 'Test Descript Brand';

      expect(component.product.brand.description).toEqual(brandDescription);
      expect(descricaoMarca.value).toEqual(brandDescription);
    });

    it('should contain the existing productCreatedAt on the product', () => {
      const el = debugElement.query(By.css('#productCreatedAt'));
      const produtoCriadoEm = el.nativeElement;

      expect(component.product.created_at).toEqual('2023-10-10T20:55:44.245Z');
      expect(produtoCriadoEm.value).toEqual('10/10/2023');
    });
  });
});
