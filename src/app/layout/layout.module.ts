import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { AppTopbarComponent } from './topbar/app.topbar.component';

@NgModule({
  declarations: [AppTopbarComponent, AppSidebarComponent],
  exports: [AppTopbarComponent, AppSidebarComponent],
  imports: [CommonModule],
})
export class LayoutModule {}
