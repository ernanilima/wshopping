import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFooterComponent } from './footer/app.footer.component';
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
    AppFooterComponent,
  ],
  exports: [AppTopbarComponent, AppSidebarComponent, AppFooterComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
