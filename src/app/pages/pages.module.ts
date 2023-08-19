import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutModule } from '../layout/layout.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { BrandComponent } from './brand/brand.component';
import { FormBrand } from './brand/brand.form';
import { BrandRegisterEditComponent } from './brand/register-edit/brand-register-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductComponent } from './product/product.component';
import { FormProduct } from './product/product.form';
import { ProductRegisterEditComponent } from './product/register-edit/product-register-edit.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    BrandComponent,
    ProductComponent,
    BrandRegisterEditComponent,
    ProductRegisterEditComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
    LayoutModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  providers: [FormBrand, FormProduct],
})
export class PagesModule {}
