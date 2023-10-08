import { Component } from '@angular/core';
import { MenuCategory } from './model/menu.category';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent {
  public model: MenuCategory[] = [
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
