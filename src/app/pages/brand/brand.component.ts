import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { Response } from 'src/app/shared/params/response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
  public loading = true;
  public columns = brandColumns;
  public brands: Response<BrandDto[]>;

  constructor(private _service: BrandService) {}

  public ngOnInit(): void {
    this.findBrands();
  }

  public findBrands(event: TableLazyLoadEvent = null): void {
    console.log(event);

    this.loading = true;
    this._service.findAll().subscribe((brands: Response<BrandDto[]>) => {
      this.brands = brands;
      this.loading = false;
    });
  }
}
