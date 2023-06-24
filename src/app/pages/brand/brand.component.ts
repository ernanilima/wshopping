import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/params/response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
  public columns = brandColumns;
  public brands: Response<BrandDto[]>;

  constructor(private _service: BrandService) {}

  public ngOnInit(): void {
    this._service.findAll().subscribe((brands: Response<BrandDto[]>) => {
      this.brands = brands;
    });
  }
}
