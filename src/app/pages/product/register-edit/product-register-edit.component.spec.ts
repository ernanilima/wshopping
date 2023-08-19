import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegisterEditComponent } from './product-register-edit.component';

describe('ProductRegisterEditComponent', () => {
  let component: ProductRegisterEditComponent;
  let fixture: ComponentFixture<ProductRegisterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegisterEditComponent],
    });
    fixture = TestBed.createComponent(ProductRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
