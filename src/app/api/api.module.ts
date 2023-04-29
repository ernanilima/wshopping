import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ConsumeComponent } from './consume/consume.component';

@NgModule({
  declarations: [ConsumeComponent],
  imports: [CommonModule, ApiRoutingModule],
})
export class ApiModule {}
