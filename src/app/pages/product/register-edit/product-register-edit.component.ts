import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, interval, map, startWith } from 'rxjs';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { BrandDto } from '../../brand/model/brand.dto';
import { ProductDto } from '../model/product.dto';
import { FormProduct } from '../product.form';

@Component({
  selector: 'app-product-register-edit',
  templateUrl: './product-register-edit.component.html',
})
export class ProductRegisterEditComponent implements OnInit, OnChanges {
  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() public onSave = new EventEmitter<boolean>();
  @Input() public visible = false;
  @Input() public product?: ProductDto;

  public loadingVisible = false;
  public openDialogToSelectBrand = false;

  public form: FormGroup;
  public currentDate$: Observable<Date>;

  constructor(private _form: FormProduct) {
    this.currentDate$ = interval(30000).pipe(
      startWith(0),
      map(() => new Date())
    );
  }

  public ngOnInit(): void {
    this.form = this._form.createForm();
  }

  public ngOnChanges(): void {
    if (!this.form) return;

    this.form.reset();
    this.form.patchValue(this.product);
  }

  public fieldWithError(field: string): boolean {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  public getErrorMessage(field: string): string {
    return ValidatorsService.getErrorMessage(field, this.form);
  }

  public resultSelectedBrand(brand: BrandDto): void {
    this.form.patchValue({ brand: brand });
    this.openDialogToSelectBrand = false;
  }

  private get _isValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    return !this.form.invalid;
  }

  public save(): void {
    if (this._isValid) {
      this.onSave.emit(true);
      this.visibleChange.emit(false);
    }
  }

  public closeDialog(): void {
    this.visibleChange.emit(false);
  }
}
