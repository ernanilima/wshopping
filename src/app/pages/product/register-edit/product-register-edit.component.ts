import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Observable,
  finalize,
  interval,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import { BaseValidationDirective } from 'src/app/shared/base/base-validation.directive';
import { BrandDto } from '../../brand/model/brand.dto';
import { ProductDto } from '../model/product.dto';
import { FormProduct } from '../product.form';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-register-edit',
  templateUrl: './product-register-edit.component.html',
})
export class ProductRegisterEditComponent
  extends BaseValidationDirective
  implements OnInit, OnChanges, OnDestroy
{
  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() public onSave = new EventEmitter<boolean>();
  @Input() public visible = false;
  @Input() public product?: ProductDto;

  public loadingVisible = false;
  public openDialogToSelectBrand = false;

  public currentDate$: Observable<Date>;

  constructor(
    private _form: FormProduct,
    private _productService: ProductService
  ) {
    super();

    this.currentDate$ = interval(30000).pipe(
      startWith(0),
      map(() => new Date()),
      takeUntil(this._unsubscribe$)
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

  public resultSelectedBrand(brand: BrandDto): void {
    this.form.patchValue({ brand: brand });
    this.openDialogToSelectBrand = false;
  }

  public save(): void {
    if (this.isValid) {
      this.loadingVisible = true;

      const service = !this.product
        ? this._productService.register(this.form.value)
        : this._productService.edit(this.form.value);

      service
        .pipe(
          finalize(() => (this.loadingVisible = false)),
          takeUntil(this._unsubscribe$)
        )
        .subscribe(() => {
          this.onSave.emit(true);
          this.visibleChange.emit(false);
        });
    }
  }

  public closeDialog(): void {
    this.visibleChange.emit(false);
  }
}
