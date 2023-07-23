import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRegisterEditComponent } from './brand-register-edit.component';

describe('BrandRegisterEditComponent', () => {
  let component: BrandRegisterEditComponent;
  let fixture: ComponentFixture<BrandRegisterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandRegisterEditComponent],
    });
    fixture = TestBed.createComponent(BrandRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
