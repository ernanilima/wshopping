import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent {
  public $loading = new BehaviorSubject<boolean>(true);
  public columns = brandColumns;
  public brands: Page<BrandDto[]>;
  public brand: BrandDto;
  public showDialog = false;
  public $reloadTable = new BehaviorSubject<boolean>(false);

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

    this.$loading.next(true);
    this._service
      .findAllBrands(params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _findAllBrandsByDescription(eventParams: TableLazyLoadEvent): void {
    const description = this._getFilter(eventParams);
    const params = PageParams.of(eventParams);

    this.$loading.next(true);
    this._service
      .findAllBrandsByDescription(description, params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
  }

  private _getFilter(eventParams: TableLazyLoadEvent): string {
    const filter = eventParams.filters['global'];
    return filter && 'value' in filter
      ? (filter as FilterMetadata).value
      : null;
  }

  private _handleBrandResult(brands: Page<BrandDto[]>): void {
    this.brands = brands;
    this.$loading.next(false);
  }

  public registerItem(): void {
    this.showDialog = true;
    this.brand = null;
  }

  public editItem(brand: BrandDto): void {
    this.showDialog = true;
    this.brand = brand;
  }

  public deleteItem(brand: BrandDto): void {
    this.$loading.next(true);
    this._service
      .delete(brand)
      .pipe(catchError(() => of(null)))
      .subscribe((response: HttpResponse<unknown>) => {
        if (!response) {
          this.$loading.next(false);
          return;
        }

        this.brands.content = this.brands.content.filter(
          (b: BrandDto) => b.id != brand.id
        );

        this.brands.size = this.brands.size - 1;
        this.brands.totalElements = this.brands.totalElements - 1;

        this.$loading.next(false);
      });
  }

  public save(): void {
    this.$reloadTable.next(true);
  }
}
