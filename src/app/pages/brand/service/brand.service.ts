import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { BrandDto } from '../model/brand.dto';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(
    private _http: HttpClient,
    private _filterService: FilterService
  ) {}

  public register(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${environment.baseUrl}/v1/marca`;
    return this._http.post(url, brand, {
      observe: 'response',
    });
  }

  public edit(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${environment.baseUrl}/v1/marca/${brand.id}`;
    return this._http.put(url, brand, {
      observe: 'response',
    });
  }

  public delete(brand: BrandDto): Observable<HttpResponse<unknown>> {
    const url = `${environment.baseUrl}/v1/marca/${brand.id}`;
    return this._http.delete(url, {
      observe: 'response',
    });
  }

  public findAllBrands(pageBuilder: PageBuilder): Observable<Page<BrandDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<BrandDto[]>>(`${environment.baseUrl}/v1/marca?${params}`)
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
        `${environment.baseUrl}/v1/marca/descricao/${description}?${params}`
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
