import { Component } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import {
  ProductNotFoundDto,
  productNotFoundColumns,
} from './model/product.dto';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  public $loadingProductsNotFound = new BehaviorSubject<boolean>(true);
  public columnsProductsNotFound = productNotFoundColumns;
  public productsNotFound: Page<ProductNotFoundDto[]>;
  public $reloadTableProductsNotFound = new BehaviorSubject<boolean>(false);

  constructor(private _service: ProductService) {}

  public findProductsNotFound(eventParams: TableLazyLoadEvent): void {
    const params = PageParams.of(eventParams);

    this.$loadingProductsNotFound.next(true);
    this._service
      .findAllProductsNotFound(params)
      .pipe(catchError(() => of(null)))
      .subscribe((productsNotFound) => {
        this.productsNotFound = productsNotFound;
        this.$loadingProductsNotFound.next(false);
      });
  }

  public searchProductNotFound(productNotFound: ProductNotFoundDto): void {
    this._service
      .getLinkSearchBarcode()
      .subscribe((link: string) =>
        window.open(link + productNotFound.barcode, '_blank')
      );
  }
}
