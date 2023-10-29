import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import { SimpleCard } from 'src/app/shared/components/card/simple-card';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { ProductDto } from '../../product/model/product.dto';
import { ProductService } from '../../product/service/product.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject();

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
    {
      name: this._productService.findProductByBarcode.name,
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

  public get showLoading(): boolean {
    return this._observables.some((item) => item.showLoading);
  }

  public openDialogResultProduct = false;
  public product?: ProductDto;
  public form: FormGroup;

  constructor(
    private _dashboardService: DashboardService,
    private _productService: ProductService,
    private _formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this._createForm();

    this._reloadTotalBrands();
    this._reloadTotalProducts();
    this._reloadTotalProductsNotFound();
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  public fieldWithError(field: string): boolean {
    return this.form.get(field)?.errors !== null;
  }

  public getErrorMessage(field: string): string {
    return ValidatorsService.getErrorMessage(field, this.form);
  }

  private _setShowLoading(name: string, visible: boolean): void {
    this._observables.find((item) => item.name === name).showLoading = visible;
  }

  protected _reloadTotalBrands(): void {
    this._reloadTotalData(
      this._dashboardService.findTotalBrands,
      (total) => (this.cardBrand = { ...this.cardBrand, total: total })
    );
  }

  protected _reloadTotalProducts(): void {
    this._reloadTotalData(
      this._dashboardService.findTotalProducts,
      (total) => (this.cardProduct = { ...this.cardProduct, total: total })
    );
  }

  protected _reloadTotalProductsNotFound(): void {
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

  protected _reloadTotalData(
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

  public findProductByBarcode(): void {
    if (this.fieldWithError('barcode') || !this.form.controls['barcode'].value)
      return;

    this._setShowLoading('findProductByBarcode', true);

    this._productService
      .findProductByBarcode(this.form.controls['barcode'].value)
      .pipe(
        finalize(() => this._setShowLoading('findProductByBarcode', false)),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.openDialogResultProduct = true;
        },
        error: () => this._reloadTotalProductsNotFound(),
      });
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      barcode: [
        null,
        [
          Validators.minLength(8),
          Validators.maxLength(14),
          Validators.pattern(ValidatorsService.numbersRegex),
        ],
      ],
    });
  }
}
