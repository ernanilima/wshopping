import { Component, OnInit } from '@angular/core';
import { SimpleCard } from 'src/app/shared/components/card/simple-card';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public cardBrand: SimpleCard = {
    title: 'Marcas',
    total: 100,
    icon: 'pi-box',
    iconColor: 'purple',
  };

  public cardProduct: SimpleCard = {
    title: 'Produtos',
    total: 200,
    icon: 'pi-shopping-cart',
    iconColor: 'blue',
  };

  public cardProductNotFound: SimpleCard = {
    title: 'Produtos não encontrados',
    total: 15,
    icon: 'pi-times-circle',
    iconColor: 'red',
  };

  public ngOnInit(): void {
    this.cardBrand.total = 101;
    this.cardProduct.total = 201;
    this.cardProductNotFound.total = 0;
  }
}
