import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopbarComponent } from './topbar/app.topbar.component';

@NgModule({
  declarations: [AppTopbarComponent],
  exports: [AppTopbarComponent],
  imports: [CommonModule],
})
export class LayoutModule {}
