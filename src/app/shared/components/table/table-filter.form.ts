import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Injectable()
export class FormTableFilter {
  constructor(private _formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    return this._formBuilder.group({
      filterGlobal: [
        null,
        [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(ValidatorsService.urlRegex),
        ],
      ],
    });
  }
}
