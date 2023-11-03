import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../shared.module';
import { SimpleCardComponent } from './card/simple-card.component';
import { FormTableFilter } from './table/table-filter.form';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [TableComponent, SimpleCardComponent],
  exports: [TableComponent, SimpleCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    FieldsetModule,
    SharedModule,
  ],
  providers: [FormTableFilter],
})
export class ComponentsModule {}
