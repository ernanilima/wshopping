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
import { FormBrand } from '../brand.form';
import { BrandDto } from '../model/brand.dto';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-brand-register-edit',
  templateUrl: './brand-register-edit.component.html',
})
export class BrandRegisterEditComponent
  extends BaseValidationDirective
  implements OnInit, OnChanges, OnDestroy
{
  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() public onSave = new EventEmitter<boolean>();
  @Input() public visible = false;
  @Input() public brand?: BrandDto;

  public loadingVisible = false;

  public currentDate$: Observable<Date>;

  private _millisecondsToReloadTime = 30000;

  constructor(
    private _form: FormBrand,
    private _brandService: BrandService
  ) {
    super();

    this.currentDate$ = interval(this._millisecondsToReloadTime).pipe(
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
    this.form.patchValue(this.brand);
  }

  public save(): void {
    if (this.isValid) {
      this.loadingVisible = true;

      const service = !this.brand
        ? this._brandService.register(this.form.value)
        : this._brandService.edit(this.form.value);

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
