import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
})
export class BrandRegisterComponent {
  @Output() public onCloseDialog = new EventEmitter();
  @Input() public register = false;

  public closeDialog(): void {
    this.onCloseDialog.emit();
  }
}
