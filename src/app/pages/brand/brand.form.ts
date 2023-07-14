import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class FormBrand {
  constructor(private _formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    return this._formBuilder.group({
      id: null,
      code: null,
      description: [''],
    });
  }
}
