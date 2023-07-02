import { Component } from '@angular/core';
import { FilterMetadata } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { Columns } from 'src/app/shared/columns';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent {
  public loading = true;
  public columns = brandColumns;
  public brands: Page<BrandDto[]>;

  public get defaultSort(): string {
    const column = this.columns.find((c: Columns) => c.defaultSort);
    return column ? column.field : '';
  }

  public get filterField(): Columns {
    return this.columns.find((c: Columns) => c.filterField);
  }

  constructor(private _service: BrandService) {}

  public findBrands(eventParams: TableLazyLoadEvent): void {
    if (Object.keys(eventParams.filters).length === 0) {
      this._findAllBrands(eventParams);
    } else {
      this._findAllBrandsByDescription(eventParams);
    }
  }

  private _findAllBrands(eventParams: TableLazyLoadEvent): void {
    const params = PageParams.of(eventParams);

    this.loading = true;
    this._service
      .findAllBrands(params)
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _findAllBrandsByDescription(eventParams: TableLazyLoadEvent): void {
    const description = this._getFilter(eventParams);
    const params = PageParams.of(eventParams);

    this.loading = true;
    this._service
      .findAllBrandsByDescription(description, params)
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _handleBrandResult(brands: Page<BrandDto[]>): void {
    this.brands = brands;
    this.loading = false;
  }

  private _getFilter(eventParams: TableLazyLoadEvent): string {
    const filter = eventParams.filters['global'];
    return filter && 'value' in filter
      ? (filter as FilterMetadata).value
      : null;
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
