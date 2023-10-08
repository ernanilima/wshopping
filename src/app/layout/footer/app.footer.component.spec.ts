import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppFooterComponent } from './app.footer.component';

describe('AppFooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppFooterComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data for footer', () => {
    expect(component.applicationName).toEqual('WShopping');
    expect(component.developerName).toEqual('Ernani Lima');
    expect(component.developerWebsite).toEqual('https://github.com/ernanilima');
  });
});
