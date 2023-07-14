import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, interval, map, startWith } from 'rxjs';
import { FormBrand } from '../brand.form';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
})
export class BrandRegisterComponent implements OnInit {
  @Output() public onCloseDialog = new EventEmitter();
  @Input() public register = false;

  public form: FormGroup;
  public currentDate$: Observable<Date>;

  constructor(private _form: FormBrand) {
    this.currentDate$ = interval(30000).pipe(
      startWith(0),
      map(() => new Date())
    );
  }

  public ngOnInit(): void {
    this.form = this._form.createForm();
  }

  public save(): void {
    this.closeDialog();
  }

  public closeDialog(): void {
    this.onCloseDialog.emit();
  }
}
