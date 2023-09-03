import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Links } from 'src/app/shared/links';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { ProductNotFoundDto } from '../model/product-not-found.dto';
import { ProductDto } from '../model/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private _http: HttpClient,
    private _filterService: FilterService
  ) {}

  public findAllProductsNotFound(
    pageBuilder: PageBuilder = null
  ): Observable<Page<ProductNotFoundDto[]>> {
    const baseUrl = environment.baseUrl;
    const params = pageBuilder ? `?${pageBuilder.pageQueryString()}` : '';

    return this._http
      .get<Page<ProductNotFoundDto[]>>(
        `${baseUrl}/v1/produto/nao-encontrado${params}`
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

  public register(product: ProductDto): Observable<HttpResponse<unknown>> {
    const url = `${environment.baseUrl}/v1/produto`;
    return this._http.post(url, product, {
      observe: 'response',
    });
  }

  public edit(product: ProductDto): Observable<HttpResponse<unknown>> {
    const url = `${environment.baseUrl}/v1/produto/${product.id}`;
    return this._http.put(url, product, {
      observe: 'response',
    });
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

  public findAllProductsByFilter(
    filter: string,
    pageBuilder: PageBuilder
  ): Observable<Page<ProductDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<ProductDto[]>>(
        `${environment.baseUrl}/v1/produto/pesquisa/${filter}?${params}`
      )
      .pipe(take(1))
      .pipe(
        map((resp: Page<ProductDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this._filterService.filter(dto)),
        }))
      );
  }

  public findProductByBarcode(barcode: string): Observable<ProductDto> {
    const baseUrl = environment.baseUrl;
    return this._http
      .get<ProductDto>(`${baseUrl}/v1/produto/codigo-barras/${barcode}`)
      .pipe(take(1));
  }
}
