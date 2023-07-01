import { Component } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { PageParams } from 'src/app/shared/params/page-params';
import { Page } from 'src/app/shared/params/page-response';
import { BrandDto, brandColumns } from './model/brand.dto';
import { BrandService } from './service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent {
  public loading = true;
  public columns = brandColumns;
  public brands: Page<BrandDto[]>;

  constructor(private _service: BrandService) {}

  public findBrands(event: TableLazyLoadEvent): void {
    const params = PageParams.of(event);

    this.loading = true;
    this._service.findAll(params).subscribe((brands: Page<BrandDto[]>) => {
      this.brands = brands;
      this.loading = false;
    });
  }
}
