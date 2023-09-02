import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  public findTotalBrands(): Observable<number> {
    const baseUrl = environment.baseUrl;
    return this._http
      .get<number>(`${baseUrl}/v1/dashboard/total-marcas`)
      .pipe(take(1));
  }

  public findTotalProducts(): Observable<number> {
    const baseUrl = environment.baseUrl;
    return this._http
      .get<number>(`${baseUrl}/v1/dashboard/total-produtos`)
      .pipe(take(1));
  }

  public findTotalProductsNotFound(): Observable<number> {
    const baseUrl = environment.baseUrl;
    return this._http
      .get<number>(`${baseUrl}/v1/dashboard/total-produtos-nao-encontrados`)
      .pipe(take(1));
  }
}
