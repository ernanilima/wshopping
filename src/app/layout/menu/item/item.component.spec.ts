import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LayoutModule } from '../../layout.module';
import { ItemComponent } from './item.component';

const itensMock = [
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'icon-home', routerLink: ['/'] }],
  },
  {
    label: 'Cadastros',
    items: [
      { label: 'Cad A', icon: 'icon-a', routerLink: ['/link-cad-a'] },
      { label: 'Cad B', icon: 'icon-b', routerLink: ['/link-cad-b'] },
    ],
  },
];

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [LayoutModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
        component.item = itensMock.at(0);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isMenuItem', () => {
    it('should return false for menu and true for item', () => {
      expect(itensMock).toHaveSize(2);

      expect(component.isMenuItem(itensMock.at(0))).toBeFalsy();
      expect(component.isMenuItem(itensMock.at(0).items.at(0))).toBeTruthy();

      expect(component.isMenuItem(itensMock.at(1))).toBeFalsy();
      expect(component.isMenuItem(itensMock.at(1).items.at(0))).toBeTruthy();
      expect(component.isMenuItem(itensMock.at(1).items.at(1))).toBeTruthy();
    });
  });

  describe('menuCategory', () => {
    it('should return the menu', () => {
      component.item = itensMock.at(0);

      expect(component.menuCategory).toEqual({
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'icon-home', routerLink: ['/'] }],
      });
    });
  });

  describe('menuItem', () => {
    it('should return the Item', () => {
      component.item = itensMock.at(0).items.at(0);

      expect(component.menuItem).toEqual({
        label: 'Dashboard',
        icon: 'icon-home',
        routerLink: ['/'],
      });
    });
  });
});
