import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LayoutModule } from '../layout.module';
import { AppMenuComponent } from './app.menu.component';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppMenuComponent],
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
        fixture = TestBed.createComponent(AppMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('model', () => {
    it('should return the modal with menus and itens', () => {
      expect(component.model).toEqual([
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
      ]);
    });
  });
});
