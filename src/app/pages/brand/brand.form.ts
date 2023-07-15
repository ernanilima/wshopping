import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Injectable()
export class FormBrand {
  constructor(private _formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    return this._formBuilder.group({
      id: null,
      code: null,
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.pattern(ValidatorsService.spacesRegex),
        ],
      ],
    });
  }
}
