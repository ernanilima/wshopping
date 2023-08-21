import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './loading/loading.component';
import { FieldToTablePipe } from './pipes/field-to-table.pipe';

@NgModule({
  declarations: [LoadingComponent, FieldToTablePipe],
  exports: [LoadingComponent, FieldToTablePipe],
  imports: [CommonModule, DialogModule, ProgressSpinnerModule],
})
export class SharedModule {}
