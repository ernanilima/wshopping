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
import { FormBrand } from '../brand.form';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
})
export class BrandRegisterComponent implements OnInit, OnChanges {
  @Output() public onCloseDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() public register = false;

  public form: FormGroup;
  public currentDate$: Observable<Date>;

  constructor(
    private _form: FormBrand,
    private _brandService: BrandService
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
      this._brandService.save(this.form.value).subscribe(() => {
        this.closeDialog(true);
      });
    }
  }

  public closeDialog(save = false): void {
    this.onCloseDialog.emit(save);
  }
}
