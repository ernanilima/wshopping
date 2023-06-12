import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './menu/app.menu.component';
import { ItemComponent } from './menu/item/item.component';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { AppTopbarComponent } from './topbar/app.topbar.component';

@NgModule({
  declarations: [
    AppTopbarComponent,
    AppSidebarComponent,
    AppMenuComponent,
    ItemComponent,
  ],
  exports: [AppTopbarComponent, AppSidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
