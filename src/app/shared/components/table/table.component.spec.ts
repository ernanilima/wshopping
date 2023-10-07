import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { ComponentsModule } from '../components.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [AppModule, ComponentsModule],
      providers: [
        {
          provide: ConfirmationService,
          useValue: {
            confirm: () => of({}),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        component.tableTitle = {
          title: 'Test',
          icon: 'pi-times-circle',
          styleClass: 'test-class-css',
        };
        component.columns = [
          {
            name: 'Código',
            field: 'code',
            fieldToSort: 'code',
            type: 'numeric',
            defaultSort: true,
          },
        ];
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
