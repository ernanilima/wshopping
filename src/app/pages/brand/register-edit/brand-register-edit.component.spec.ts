import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { PagesModule } from '../../pages.module';
import { FormBrand } from '../brand.form';
import { BrandService } from '../service/brand.service';
import { BrandRegisterEditComponent } from './brand-register-edit.component';

describe('BrandRegisterEditComponent', () => {
  let component: BrandRegisterEditComponent;
  let fixture: ComponentFixture<BrandRegisterEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrandRegisterEditComponent],
      imports: [PagesModule],
      providers: [
        FormBrand,
        {
          provide: BrandService,
          useValue: {
            register: () => of({}),
            edit: () => of({}),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BrandRegisterEditComponent);
        component = fixture.componentInstance;
        component['_millisecondsToReloadTime'] = 100;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('currentDate', () => {
    it('should initialize currentDate$', (done) => {
      component.currentDate$.subscribe((result) => {
        expect(result instanceof Date).toBeTruthy();
        expect(result).toEqual(new Date());
        done();
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should not perform any action because the form is undefined', () => {
      component.form = undefined;

      component.ngOnChanges();

      expect(component.form).toBeUndefined();
    });

    it('should not perform any action because the form is null', () => {
      component.form = null;

      component.ngOnChanges();

      expect(component.form).toBeNull();
    });

    it('should reset the form and enter brand data', () => {
      component.brand = {
        id: 'a22b8e78-fa9a-4dbd-a121-d1d7e916754f',
        code: 101,
        description: 'Test Descript',
        total_products: 2,
        created_at: '12/12/2023 22:32',
      };

      spyOn(component.form, 'reset');

      expect(component.form.getRawValue()).toEqual({
        id: null,
        code: null,
        description: '',
      });

      component.ngOnChanges();

      expect(component.form.reset).toHaveBeenCalled();
      expect(component.form.getRawValue()).toEqual({
        id: 'a22b8e78-fa9a-4dbd-a121-d1d7e916754f',
        code: 101,
        description: 'Test Descript',
      });
    });
  });

  describe('fieldWithError', () => {
    it('should return true because the field contains an error and was touched', () => {
      component.form.controls['description'].setValue(null); // tem que ter valor
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].setValue(''); // tem que ter valor
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].setValue('1'); // tem que ter no minimo 2 caracteres
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].setValue('1234567890123456'); // tem que ter no maximo 15 caracteres
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].setValue(' 12345'); // nao pode ter espacos no inicio
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].setValue(' 12345  '); // nao pode ter espacos no inicio/final
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();

      component.form.controls['description'].patchValue('12345  '); // nao pode ter espacos no final
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeTruthy();
    });

    it('should return false because the field contains an error and was not touched', () => {
      component.form.controls['description'].setValue(null);
      component.form.controls['description'].markAsUntouched();
      expect((component as any).fieldWithError('description')).toBeFalsy();
    });

    it('should return false because the field does not contain an error and was touched (maximo de caracteres)', () => {
      component.form.controls['description'].setValue('123456789012345');
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeFalsy();
    });

    it('should return false because the field does not contain an error and was touched (minimo de caracteres)', () => {
      component.form.controls['description'].setValue('12');
      component.form.controls['description'].markAsTouched();
      expect((component as any).fieldWithError('description')).toBeFalsy();
    });
  });

  describe('getErrorMessage', () => {
    it('should return message to Validators.required', () => {
      component.form.controls['description'].setValue(null);
      expect((component as any).getErrorMessage('description')).toEqual(
        'Campo deve ser preenchido'
      );
    });

    it('should return message to Validators.minLength(2)', () => {
      component.form.controls['description'].setValue('1');
      expect((component as any).getErrorMessage('description')).toEqual(
        'Campo deve conter no mínimo 2 caractere(s)'
      );
    });

    it('should return message to Validators.maxLength(15)', () => {
      component.form.controls['description'].setValue('1234567890123456');
      expect((component as any).getErrorMessage('description')).toEqual(
        'Campo deve conter no máximo 15 caractere(s)'
      );
    });

    it('should return message to Validators.pattern(ValidatorsService.spacesRegex) (inicio)', () => {
      component.form.controls['description'].setValue(' 12345');
      expect((component as any).getErrorMessage('description')).toEqual(
        'Campo com espaços inválidos'
      );
    });

    it('should return message to Validators.pattern(ValidatorsService.spacesRegex) (final)', () => {
      component.form.controls['description'].setValue('12345  ');
      expect((component as any).getErrorMessage('description')).toEqual(
        'Campo com espaços inválidos'
      );
    });
  });

  describe('save', () => {
    it('should not save and should call the markAllAsTouched method', () => {
      spyOn(component.form, 'markAllAsTouched');

      component.form.controls['description'].setValue(null);

      component.save();

      expect(component.form.markAllAsTouched).toHaveBeenCalled();
      expect(component.loadingVisible).toBeFalsy();
    });

    it('should emit onSave and visibleChange on successful save (register)', fakeAsync(() => {
      component.form.controls['description'].setValue('Test Descript');
      component.brand = undefined;

      spyOn(component.onSave, 'emit');
      spyOn(component.visibleChange, 'emit');

      spyOn((component as any)._brandService, 'register').and.callThrough();

      component.save();

      expect(component.onSave.emit).toHaveBeenCalledWith(true);
      expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
    }));

    it('should emit onSave and visibleChange on successful save (edit)', fakeAsync(() => {
      component.brand = {
        id: 'a22b8e78-fa9a-4dbd-a121-d1d7e916754f',
        code: 101,
        description: 'Test Descript',
        total_products: 2,
        created_at: '12/12/2023 22:32',
      };
      component.form.patchValue(component.brand);

      spyOn(component.onSave, 'emit');
      spyOn(component.visibleChange, 'emit');

      spyOn((component as any)._brandService, 'edit').and.callThrough();

      component.save();

      expect(component.onSave.emit).toHaveBeenCalledWith(true);
      expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
    }));
  });

  describe('closeDialog', () => {
    it('should emit visibleChange on closeDialog', () => {
      spyOn(component.visibleChange, 'emit');

      component.closeDialog();

      expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
    });
  });
});
