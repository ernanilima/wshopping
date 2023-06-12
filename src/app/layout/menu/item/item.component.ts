import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';
import { MenuCategory, MenuItem } from '../model/menu.category';

@Component({
  selector: '[app-menuitem]',
  templateUrl: './item.component.html',
  animations: [
    trigger('children', [
      state('collapsed', style({ height: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class ItemComponent {
  @Input() public item: MenuCategory | MenuItem;

  @Input() public index: number;

  @Input() @HostBinding('class.layout-root-menuitem') public root: boolean;

  public isMenuItem(value: MenuCategory | MenuItem): boolean {
    return (
      (value as MenuCategory).items === undefined &&
      (value as MenuItem).routerLink !== undefined
    );
  }

  public get menuCategory(): MenuCategory {
    return this.item as MenuCategory;
  }

  public get menuItem(): MenuItem {
    return this.item as MenuItem;
  }

  public itemClick(value: MenuItem): void {
    console.log(value);
  }
}
