import { Component } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { TableTitle } from 'src/app/shared/components/table/table.title';
import { PageFilter } from 'src/app/shared/params/page-filter';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { ProductDto, productColumns } from './model/product.dto';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  public tableTitleProducts: TableTitle = {
    title: 'Produtos',
    icon: 'pi-shopping-cart',
  };

  public $loadingProducts = new BehaviorSubject<boolean>(true);
  public columnsProducts = productColumns;
  public products: Page<ProductDto[]>;
  public product: ProductDto;
  public showDialogProduct = false;
  public $reloadTableProducts = new BehaviorSubject<boolean>(false);
  public $reloadTableProductsNotFound = new BehaviorSubject<boolean>(false);

  constructor(private _service: ProductService) {}

  public findProducts(eventParams: TableLazyLoadEvent): void {
    if (!PageFilter.of(eventParams)) {
      this._findAllProducts(eventParams);
    } else {
      this._findAllProductsByFilter(eventParams);
    }
  }

  public _findAllProducts(eventParams: TableLazyLoadEvent): void {
    const params = PageParams.of(eventParams);

    this.$loadingProducts.next(true);
    this._service
      .findAllProducts(params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleProductResult.bind(this));
  }

  private _findAllProductsByFilter(eventParams: TableLazyLoadEvent): void {
    const filter = PageFilter.of(eventParams);
    const params = PageParams.of(eventParams);

    this.$loadingProducts.next(true);
    this._service
      .findAllProductsByFilter(filter, params)
      .pipe(catchError(() => of(null)))
      .subscribe(this._handleProductResult.bind(this));
  }

  private _handleProductResult(products: Page<ProductDto[]>): void {
    this.products = products;
    this.$loadingProducts.next(false);
  }

  public registerProduct(): void {
    console.log('registerProduct');
  }

  public editProduct(product: ProductDto): void {
    this.showDialogProduct = true;
    this.product = product;
  }

  public deleteProduct(product: ProductDto): void {
    console.log('deleteProduct', product);
  }

  public saveProduct(): void {
    this.$reloadTableProductsNotFound.next(true);
    this.$reloadTableProducts.next(true);
  }
}
