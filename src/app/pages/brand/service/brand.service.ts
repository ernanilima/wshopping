import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrandDto } from '../model/brand.dto';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _http: HttpClient) {}

  public findAll(): Observable<BrandDto[]> {
    return this._http
      .get<BrandDto[]>(`${environment.baseUrl}/v1/marca`)
      .pipe(take(1));
  }
}
