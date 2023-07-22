import { Component, ViewChild } from '@angular/core';
import { FilterMetadata } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { catchError, of } from 'rxjs';
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
  @ViewChild('table') private _table: Table;
  @ViewChild('filter') private _filter: HTMLInputElement;

  public loading = true;
  public columns = brandColumns;
  public brands: Page<BrandDto[]>;
  public value = '';
  public openDialog = false;

  public get defaultSort(): Columns {
    return this.columns.find((c: Columns) => c.defaultSort);
  }

  public get defaultFilter(): Columns {
    return this.columns.find((c: Columns) => c.defaultFilter);
  }

  constructor(private _service: BrandService) {}

  public findBrands(eventParams: TableLazyLoadEvent): void {
    if (
      Object.keys(eventParams.filters).length === 0 ||
      !this._getFilter(eventParams)
    ) {
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
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _findAllBrandsByDescription(eventParams: TableLazyLoadEvent): void {
    const description = this._getFilter(eventParams);
    const params = PageParams.of(eventParams);

    this.loading = true;
    this._service
      .findAllBrandsByDescription(description, params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _handleBrandResult(brands: Page<BrandDto[]>): void {
    this.brands = brands;
    this.loading = false;
  }

  public clear(): void {
    this.value = null;
    this._filter.value = this.value;
    this._table.clearFilterValues();
    this._table.sortSingle();
  }

  private _getFilter(eventParams: TableLazyLoadEvent): string {
    const filter = eventParams.filters['global'];
    return filter && 'value' in filter
      ? (filter as FilterMetadata).value
      : null;
  }

  public onGlobalFilter(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this._table.filterGlobal(this.value, 'contains');
  }

  public openDialogRegister(): void {
    this.openDialog = true;
  }

  public editItem(brand: BrandDto): void {
    console.log('EDIT', brand);
  }

  public deleteItem(brand: BrandDto): void {
    console.log('DELETE', brand);
  }

  public closeDialog(save: boolean): void {
    if (save) {
      this._table.sortField = this.defaultSort.field;
      this._table.sortOrder = -1;
      this.clear();
    }

    this.openDialog = false;
  }
}
