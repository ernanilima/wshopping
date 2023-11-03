import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Injectable()
export class FormDashboard {
  constructor(private _formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    return this._formBuilder.group({
      barcode: [
        null,
        [
          Validators.minLength(8),
          Validators.maxLength(14),
          Validators.pattern(ValidatorsService.numbersRegex),
        ],
      ],
    });
  }
}
