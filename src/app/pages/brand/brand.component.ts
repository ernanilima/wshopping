import { Component, OnInit } from '@angular/core';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
  constructor(private _service: BrandService) {}

  public ngOnInit(): void {
    this._service.findAll().subscribe((brands) => {
      console.log(brands);
    });
  }
}
