import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ConsumeService } from './consume.service';

@Component({
  template: '<p>Acessar a API</p>',
})
export class ConsumeComponent implements OnInit {
  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _service: ConsumeService
  ) {}

  public ngOnInit(): void {
    this.urlToApi();
  }

  protected urlToApi(): void {
    this._service
      .getUrlToApi()
      .pipe(map((data) => data.concat(this._paramsToAccessAPI)))
      .subscribe((data) => {
        console.log('url completa', data);
      });
  }

  private get _paramsToAccessAPI(): string {
    const path =
      this._activatedRoute.snapshot.root.firstChild?.routeConfig?.path;
    return this._route.url.split(path!)[1];
  }
}
