import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { MenuCategory } from './model/menu.category';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  public model: MenuCategory[] = [];

  constructor(public layoutService: LayoutService) {}

  public ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Marca',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/marca'],
          },
          {
            label: 'Produto',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['/produto'],
          },
        ],
      },
    ];
  }
}
