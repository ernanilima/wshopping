import { DatePipe, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PageBuilder } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { environment } from 'src/environments/environment';
import { BrandDto } from '../model/brand.dto';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(
    private _http: HttpClient,
    private _titlecase: TitleCasePipe,
    private _datePipe: DatePipe
  ) {}

  public findAllBrands(pageBuilder: PageBuilder): Observable<Page<BrandDto[]>> {
    const params = pageBuilder.pageQueryString();

    return this._http
      .get<Page<BrandDto[]>>(`${environment.baseUrl}/v1/marca?${params}`)
      .pipe(
        map((resp: Page<BrandDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this.filter(dto)),
        }))
      )
      .pipe(take(1));
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
      .pipe(
        map((resp: Page<BrandDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this.filter(dto)),
        }))
      )
      .pipe(take(1));
  }

  public save(brand: BrandDto): Observable<HttpResponse<unknown>> {
    return this._http.post(`${environment.baseUrl}/v1/marca`, brand, {
      observe: 'response',
    });
  }

  private filter(dto: BrandDto): BrandDto {
    return {
      ...dto,
      description: this._titlecase.transform(dto.description),
      created_at: this._datePipe.transform(dto.created_at, 'dd/MM/yyyy HH:mm'),
    };
  }
}
