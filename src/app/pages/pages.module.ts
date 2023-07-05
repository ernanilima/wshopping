import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
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
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class PagesModule {}
