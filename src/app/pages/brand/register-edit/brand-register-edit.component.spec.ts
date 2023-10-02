import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesModule } from '../../pages.module';
import { BrandService } from '../service/brand.service';
import { BrandRegisterEditComponent } from './brand-register-edit.component';

describe('BrandRegisterEditComponent', () => {
  let component: BrandRegisterEditComponent;
  let fixture: ComponentFixture<BrandRegisterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandRegisterEditComponent],
      imports: [PagesModule],
      providers: [
        {
          provide: BrandService,
          useValue: jasmine.createSpyObj('brandServiceMock', ['']),
        },
      ],
    });
    fixture = TestBed.createComponent(BrandRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
