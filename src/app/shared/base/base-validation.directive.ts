import { Directive, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidatorsService } from '../validators/validators.service';

@Directive()
export class BaseValidationDirective implements OnDestroy {
  protected _unsubscribe$ = new Subject();

  public form: FormGroup;

  protected get isValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    return !this.form.invalid;
  }

  protected fieldWithError(field: string): boolean {
    return (
      this.form.get(field)?.errors !== null && this.form.get(field)?.touched
    );
  }

  protected getErrorMessage(field: string): string {
    return ValidatorsService.getErrorMessage(field, this.form);
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
    this._unsubscribe$.unsubscribe();
  }
}
