import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { LayoutModule } from '../layout/layout.module';
import { BrandComponent } from './brand/brand.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    BrandComponent,
    ProductComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, LayoutModule, CardModule],
})
export class PagesModule {}