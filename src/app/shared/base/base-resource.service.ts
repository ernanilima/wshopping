import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API } from '../model/api.model';
import { FilterService } from '../services/filter.service';
import { SharedDataService } from '../services/shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class BaseResourceService {
  private _prod: boolean;

  protected readonly _http: HttpClient;
  protected readonly _filterService: FilterService;
  protected readonly _sharedDataService: SharedDataService;

  constructor(protected injector: Injector) {
    this._prod = environment.prod;

    this._sharedDataService = injector.get(SharedDataService);
    this._http = injector.get(HttpClient);
    this._filterService = injector.get(FilterService);
  }

  public async updateUrlToApi(): Promise<void> {
    this._sharedDataService.baseUrl = await firstValueFrom(
      this._http
        .get<API>('assets/api.json')
        .pipe(map((data) => (this._prod ? data.urlProd : data.urlDev)))
    );
  }
}
