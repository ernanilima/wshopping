import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { LayoutModule } from '../layout/layout.module';
import { BrandComponent } from './brand/brand.component';
import { FormBrand } from './brand/brand.form';
import { BrandRegisterComponent } from './brand/register/brand-register.component';
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
    BrandRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    LayoutModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  providers: [FormBrand],
})
export class PagesModule {}
