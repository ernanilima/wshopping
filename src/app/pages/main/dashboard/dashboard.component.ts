import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SimpleCard } from 'src/app/shared/components/card/simple-card';
import { DashboardService } from '../service/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private _observables: { name: string; showLoading: boolean }[] = [
    {
      name: this._dashboardService.findTotalBrands.name,
      showLoading: false,
    },
    {
      name: this._dashboardService.findTotalProducts.name,
      showLoading: false,
    },
    {
      name: this._dashboardService.findTotalProductsNotFound.name,
      showLoading: false,
    },
  ];

  public cardBrand: SimpleCard = {
    routerLink: '/marca',
    title: 'Marcas',
    total: 0,
    icon: 'pi-box',
    iconColor: 'purple',
  };

  public cardProduct: SimpleCard = {
    routerLink: '/produto',
    title: 'Produtos',
    total: 0,
    icon: 'pi-shopping-cart',
    iconColor: 'blue',
  };

  public cardProductNotFound: SimpleCard = {
    routerLink: '/produto',
    title: 'Produtos não encontrados',
    total: 0,
    icon: 'pi-times-circle',
    iconColor: 'red',
  };

  constructor(private _dashboardService: DashboardService) {}

  public ngOnInit(): void {
    this._reloadTotalBrands();
    this._reloadTotalProducts();
    this._reloadTotalProductsNotFound();
  }

  public get showLoading(): boolean {
    return this._observables.some((item) => item.showLoading);
  }

  private _setShowLoading(name: string, visible: boolean): void {
    this._observables.find((item) => item.name === name).showLoading = visible;
  }

  private _reloadTotalBrands(): void {
    this._reloadTotalData(
      this._dashboardService.findTotalBrands,
      (total) => (this.cardBrand = { ...this.cardBrand, total: total })
    );
  }

  private _reloadTotalProducts(): void {
    this._reloadTotalData(
      this._dashboardService.findTotalProducts,
      (total) => (this.cardProduct = { ...this.cardProduct, total: total })
    );
  }

  private _reloadTotalProductsNotFound(): void {
    this._reloadTotalData(
      this._dashboardService.findTotalProductsNotFound,
      (total) => {
        this.cardProductNotFound = {
          ...this.cardProductNotFound,
          total: total,
        };
      }
    );
  }

  private _reloadTotalData(
    serviceMethod: () => Observable<number>,
    callback: (total: number) => void
  ): void {
    const name = serviceMethod.name.replace(/^bound /, '');
    this._setShowLoading(name, true);

    serviceMethod
      .bind(this._dashboardService)()
      .pipe(finalize(() => this._setShowLoading(name, false)))
      .subscribe((total) => {
        callback(total);
      });
  }
}
