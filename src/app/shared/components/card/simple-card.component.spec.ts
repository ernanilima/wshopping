import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ComponentsModule } from '../components.module';
import { SimpleCardComponent } from './simple-card.component';

describe('SimpleCardComponent', () => {
  let component: SimpleCardComponent;
  let fixture: ComponentFixture<SimpleCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleCardComponent],
      imports: [ComponentsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SimpleCardComponent);
        component = fixture.componentInstance;
        component.simpleCard = {
          routerLink: '/test',
          title: 'Test',
          total: 0,
          icon: 'pi-box',
          iconColor: 'purple',
        };
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
