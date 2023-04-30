import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: '<p>Acessar a API</p>',
})
export class ConsumeComponent implements OnInit {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const uri: string = this.route.url.split(this._path!)[1];
    console.log('url completa:', uri);
  }

  private get _path() {
    return this.activatedRoute.snapshot.root.firstChild?.routeConfig?.path;
  }
}
