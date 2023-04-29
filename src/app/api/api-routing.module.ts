import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsumeComponent } from './consume/consume.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '**', component: ConsumeComponent }]),
  ],
  exports: [RouterModule],
})
export class ApiRoutingModule {}
