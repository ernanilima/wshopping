import { HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/base/base-resource.service';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { BrandDto } from '../model/brand.dto';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseResourceService {
  private baseUrl = this._sharedDataService.baseUrl;

  constructor(protected _injector: Injector) {
    super(_injector);
  }

  public register(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${this.baseUrl}/v1/marca`;
    return this._http.post(url, brand, {
      observe: 'response',
    });
  }

  public edit(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${this.baseUrl}/v1/marca/${brand.id}`;
    return this._http.put(url, brand, {
      observe: 'response',
    });
  }

  public delete(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${this.baseUrl}/v1/marca/${brand.id}`;
    return this._http.delete(url, {
      observe: 'response',
    });
  }

  public findAllBrands(pageBuilder: PageBuilder): Observable<Page<BrandDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<BrandDto[]>>(`${this.baseUrl}/v1/marca?${params}`)
      .pipe(take(1))
      .pipe(
        map((resp: Page<BrandDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this._filterService.filter(dto)),
        }))
      );
  }

  public findAllBrandsByDescription(
    description: string,
    pageBuilder: PageBuilder
  ): Observable<Page<BrandDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<BrandDto[]>>(
        `${this.baseUrl}/v1/marca/descricao/${description}?${params}`
      )
      .pipe(take(1))
      .pipe(
        map((resp: Page<BrandDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this._filterService.filter(dto)),
        }))
      );
  }
}
