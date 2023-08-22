import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Injectable()
export class FormProduct {
  constructor(private _formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    return this._formBuilder.group({
      id: null,
      barcode: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
          Validators.pattern(ValidatorsService.numbersRegex),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
          Validators.pattern(ValidatorsService.spacesRegex),
        ],
      ],
      brand: this._formBuilder.group({
        id: [null, Validators.required],
        description: [null, Validators.required],
      }),
    });
  }
}
