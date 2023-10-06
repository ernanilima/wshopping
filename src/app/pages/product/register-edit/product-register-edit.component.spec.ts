import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from '../../pages.module';
import { ProductRegisterEditComponent } from './product-register-edit.component';

describe('ProductRegisterEditComponent', () => {
  let component: ProductRegisterEditComponent;
  let fixture: ComponentFixture<ProductRegisterEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegisterEditComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProductRegisterEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
