import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, finalize, interval, map, startWith } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { FormBrand } from '../brand.form';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-brand-register-edit',
  templateUrl: './brand-register-edit.component.html',
})
export class BrandRegisterEditComponent implements OnInit, OnChanges {
  @Output() public onCloseDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() public visible = false;

  public loadingVisible = false;

  public form: FormGroup;
  public currentDate$: Observable<Date>;

  constructor(
    private _form: FormBrand,
    private _brandService: BrandService,
    private _toastService: ToastService
  ) {
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
  }

  public fieldWithError(field: string): boolean {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  public getErrorMessage(field: string): string {
    return ValidatorsService.getErrorMessage(field, this.form);
  }

  private get _isValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    return !this.form.invalid;
  }

  public save(): void {
    if (this._isValid) {
      this.loadingVisible = true;
      this._brandService
        .save(this.form.value)
        .pipe(finalize(() => (this.loadingVisible = false)))
        .subscribe(() => {
          this._toastService.success('Sucesso', 'Marca registrada com sucesso');
          this.closeDialog(true);
        });
    }
  }

  public closeDialog(save = false): void {
    this.onCloseDialog.emit(save);
  }
}