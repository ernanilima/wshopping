import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API } from '../model/api.model';

@Injectable({
  providedIn: 'root',
})
export class ConsumeService {
  constructor(private _http: HttpClient) {}

  public getUrlToApi(): Observable<string> {
    return this._http.get<API>('assets/api.json').pipe(map((data) => data.url));
  }
}
