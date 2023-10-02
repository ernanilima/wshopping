import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PagesModule } from '../pages.module';
import { BrandComponent } from './brand.component';
import { BrandService } from './service/brand.service';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrandComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
      providers: [
        {
          provide: BrandService,
          useValue: jasmine.createSpyObj('brandService', ['findAllBrands'], {
            findAllBrands: jasmine.createSpy().and.callFake(() => of()),
          }),
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BrandComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
