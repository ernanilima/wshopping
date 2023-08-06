import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
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
}
