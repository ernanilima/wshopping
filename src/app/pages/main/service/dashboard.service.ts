import { Injectable, Injector } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/base/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseResourceService {
  private baseUrl = this._sharedDataService.baseUrl;

  constructor(protected _injector: Injector) {
    super(_injector);
  }

  public findTotalBrands(): Observable<number> {
    return this._http
      .get<number>(`${this.baseUrl}/v1/dashboard/total-marcas`)
      .pipe(take(1));
  }

  public findTotalProducts(): Observable<number> {
    return this._http
      .get<number>(`${this.baseUrl}/v1/dashboard/total-produtos`)
      .pipe(take(1));
  }

  public findTotalProductsNotFound(): Observable<number> {
    return this._http
      .get<number>(
        `${this.baseUrl}/v1/dashboard/total-produtos-nao-encontrados`
      )
      .pipe(take(1));
  }
}
