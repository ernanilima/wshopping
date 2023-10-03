import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { ResultProductComponent } from './result-product.component';

describe('ResultProductComponent', () => {
  let component: ResultProductComponent;
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
        component.product = {
          id: '95de4a85-63ab-483f-a743-18490aea90b8',
          barcode: '789102030',
          description: 'Produto 102030',
          brand: {
            id: '61b832c7-acea-4924-ba99-d3a54b4ac2a3',
            code: 101,
            description: 'Marca 101',
            total_products: 2,
            created_at: '10/10/2023 20:30',
          },
          created_at: '11/11/2023 21:31',
        };
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
