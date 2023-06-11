import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [CommonModule, PagesRoutingModule, LayoutModule, CardModule],
})
export class PagesModule {}
