import { Component, Input, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { TableTitle } from 'src/app/shared/components/table/table.title';
import { PageFilter } from 'src/app/shared/params/page-filter';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import {
  ProductNotFoundDto,
  productNotFoundColumns,
} from '../model/product.dto';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-not-found',
  templateUrl: './product-not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  @Input({ required: true }) public $reloadTableProductsNotFound =
    new BehaviorSubject<boolean>(false);

  public tableTitleProductsNotFound: TableTitle = {
    title: 'Produtos não encontrados',
    icon: 'pi-times-circle',
    styleClass: 'fieldset-legend-background-bisque',
  };

  public showTableProductsNotFound = false;
  public $loadingProductsNotFound = new BehaviorSubject<boolean>(true);
  public columnsProductsNotFound = productNotFoundColumns;
  public productsNotFound: Page<ProductNotFoundDto[]>;

  constructor(private _service: ProductService) {}

  public ngOnInit(): void {
    this._service
      .findAllProductsNotFound()
      .pipe(catchError(() => of(null)))
      .subscribe((result) => {
        if (result.content) this.showTableProductsNotFound = true;
      });
  }

  public findProductsNotFound(eventParams: TableLazyLoadEvent): void {
    if (!PageFilter.of(eventParams)) {
      this._findAllProductsNotFound(eventParams);
    } else {
      this._findAllProductsNotFoundByBarcode(eventParams);
    }
  }

  public _findAllProductsNotFound(eventParams: TableLazyLoadEvent): void {
    const params = PageParams.of(eventParams);

    this.$loadingProductsNotFound.next(true);
    this._service
      .findAllProductsNotFound(params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleProductNotFoundResult.bind(this));
  }

  public _findAllProductsNotFoundByBarcode(
    eventParams: TableLazyLoadEvent
  ): void {
    const barcode = PageFilter.of(eventParams);
    const params = PageParams.of(eventParams);

    this.$loadingProductsNotFound.next(true);
    this._service
      .findAllProductsNotFoundByBarcode(barcode, params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleProductNotFoundResult.bind(this));
  }

  private _handleProductNotFoundResult(
    productsNotFound: Page<ProductNotFoundDto[]>
  ): void {
    this.productsNotFound = productsNotFound;
    this.$loadingProductsNotFound.next(false);
  }

  public searchProductNotFound(productNotFound: ProductNotFoundDto): void {
    this._service
      .getLinkSearchBarcode()
      .subscribe((link: string) =>
        window.open(link + productNotFound.barcode, '_blank')
      );
  }
}
