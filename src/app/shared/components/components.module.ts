import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../shared.module';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    FieldsetModule,
    SharedModule,
  ],
})
export class ComponentsModule {}
