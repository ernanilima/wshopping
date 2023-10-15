import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { TableTitle } from 'src/app/shared/components/table/table.title';
import { PageFilter } from 'src/app/shared/params/page-filter';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
  @Output() public onSelectedBrand = new EventEmitter<BrandDto>();
  public isToSelectBrand = false;

  public tableTitleBrands: TableTitle = {
    title: 'Marcas',
    icon: 'pi-box',
  };

  public $loading = new BehaviorSubject<boolean>(true);
  public columns = brandColumns;
  public brands: Page<BrandDto[]>;
  public brand: BrandDto;
  public showDialog = false;
  public $reloadTable = new BehaviorSubject<boolean>(false);

  constructor(private _service: BrandService) {}

  public ngOnInit(): void {
    this.isToSelectBrand = this.onSelectedBrand.observed;
  }

  public findBrands(eventParams: TableLazyLoadEvent): void {
    if (!PageFilter.of(eventParams)) {
      this._findAllBrands(eventParams);
    } else {
      this._findAllBrandsByDescription(eventParams);
    }
  }

  protected _findAllBrands(eventParams: TableLazyLoadEvent): void {
    const params = PageParams.of(eventParams);

    this.$loading.next(true);
    this._service
      .findAllBrands(params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
  }

  protected _findAllBrandsByDescription(eventParams: TableLazyLoadEvent): void {
    const description = PageFilter.of(eventParams);
    const params = PageParams.of(eventParams);

    this.$loading.next(true);
    this._service
      .findAllBrandsByDescription(description, params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleBrandResult.bind(this));
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

  public selectItem(brand: BrandDto): void {
    this.isToSelectBrand = false;
    this.onSelectedBrand.emit(brand);
  }

  public save(): void {
    this.$reloadTable.next(true);
  }
}
