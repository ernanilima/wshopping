import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrandDto } from '../model/brand.dto';
import { Response } from 'src/app/shared/params/response';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(
    private _http: HttpClient,
    private _titlecase: TitleCasePipe,
    private _datePipe: DatePipe
  ) {}

  public findAll(): Observable<Response<BrandDto[]>> {
    return this._http
      .get<Response<BrandDto[]>>(
        `${environment.baseUrl}/v1/marca?sort=code,asc`
      )
      .pipe(
        map((resp: Response<BrandDto[]>) => ({
          ...resp,
          content: resp.content.map((dto) => this.filter(dto)),
        }))
      )
      .pipe(take(1));
  }

  private filter(dto: BrandDto): BrandDto {
    return {
      ...dto,
      description: this._titlecase.transform(dto.description),
      created_at: this._datePipe.transform(dto.created_at, 'dd/MM/yyyy HH:mm'),
    };
  }
}
