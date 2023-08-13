import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Links } from 'src/app/shared/links';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { ProductDto, ProductNotFoundDto } from '../model/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private _http: HttpClient,
    private _filterService: FilterService
  ) {}

  public findAllProductsNotFound(
    pageBuilder: PageBuilder
  ): Observable<Page<ProductNotFoundDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<ProductNotFoundDto[]>>(
        `${environment.baseUrl}/v1/produto/nao-encontrado?${params}`
      )
      .pipe(take(1));
  }

  public findAllProductsNotFoundByBarcode(
    barcode: string,
    pageBuilder: PageBuilder
  ): Observable<Page<ProductNotFoundDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<ProductNotFoundDto[]>>(
        `${environment.baseUrl}/v1/produto/nao-encontrado/${barcode}?${params}`
      )
      .pipe(take(1));
  }

  public getLinkSearchBarcode(): Observable<string> {
    return this._http
      .get<Links>('assets/links.json')
      .pipe(map((links) => links.searchBarcode));
  }

  public findAllProducts(
    pageBuilder: PageBuilder
  ): Observable<Page<ProductDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<ProductDto[]>>(`${environment.baseUrl}/v1/produto?${params}`)
      .pipe(take(1))
      .pipe(
        map((resp: Page<ProductDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this._filterService.filter(dto)),
        }))
      );
  }
}
