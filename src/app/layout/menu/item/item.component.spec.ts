import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutModule } from '../../layout.module';
import { ItemComponent } from './item.component';
import { ActivatedRoute } from '@angular/router';

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
    });
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    component.item = {
      label: 'Menu Principal',
      items: [
        {
          label: 'Cadastro Principal',
          icon: 'pi pi-fw pi-box',
          routerLink: ['cadastro-principal'],
        },
      ],
    };

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
