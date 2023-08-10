import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Links } from 'src/app/shared/links';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { environment } from 'src/environments/environment';
import { ProductNotFoundDto } from '../model/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

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
}
