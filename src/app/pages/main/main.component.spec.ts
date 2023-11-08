import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { NavigationEnd, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PagesModule } from '../pages.module';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let layoutService: LayoutService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [AppModule, PagesModule, RouterTestingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        layoutService = TestBed.inject(LayoutService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('watchMenuMobile', () => {
    it('should not call the hideMenu method because clicked on the topbar component button', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(layoutService.openOverlayForMenuMobile$, 'pipe').and.returnValue(
        of(true)
      );
      spyOn(
        componentMock._appTopbar.menuButton.nativeElement,
        'isSameNode'
      ).and.returnValue(true);
      spyOn(
        componentMock._appTopbar.menuButton.nativeElement,
        'contains'
      ).and.returnValue(true);
      spyOn(componentMock, '_hideMenu');

      componentMock._watchMenuMobile();

      document.dispatchEvent(new MouseEvent('click'));

      expect(componentMock._hideMenu).not.toHaveBeenCalled();
    }));

    it('should call the hideMenu method because clicked outside the topbar component button', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(layoutService.openOverlayForMenuMobile$, 'pipe').and.returnValue(
        of(true)
      );
      spyOn(
        componentMock._appTopbar.menuButton.nativeElement,
        'isSameNode'
      ).and.returnValue(false);
      spyOn(
        componentMock._appTopbar.menuButton.nativeElement,
        'contains'
      ).and.returnValue(false);
      spyOn(componentMock, '_hideMenu');

      componentMock._watchMenuMobile();

      document.dispatchEvent(new MouseEvent('click'));

      expect(componentMock._hideMenu).toHaveBeenCalled();
    }));
  });

  describe('watchRouterEvents', () => {
    it('should call the hideMenu method because it changed route', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(componentMock, '_hideMenu');

      const navEnd = new NavigationEnd(0, '/mock-url-a', 'mock-url-b');

      componentMock._router.events.next(navEnd);

      componentMock._watchRouterEvents();

      expect(componentMock._hideMenu).toHaveBeenCalled();
    }));

    it('should not call the hideMenu method because it did not change the route', fakeAsync(() => {
      const componentMock = component as any;

      spyOn(componentMock, '_hideMenu');

      const navStart = new NavigationStart(0, '/mock-url-a');

      componentMock._router.events.next(navStart);

      componentMock._watchRouterEvents();

      expect(componentMock._hideMenu).not.toHaveBeenCalled();
    }));
  });

  describe('hideMenu', () => {
    it('should change the isMenuMobile variable to false', () => {
      const componentMock = component as any;

      layoutService.state.isMenuMobile = true;

      expect(layoutService.state.isMenuMobile).toBeTruthy();
      componentMock._hideMenu();
      expect(layoutService.state.isMenuMobile).toBeFalsy();
    });
  });

  describe('containerClass', () => {
    it('should return the name of the class and its status', () => {
      layoutService.state.isMenuDesktop = true;
      layoutService.state.isMenuMobile = true;

      expect(component.containerClass).toEqual({
        'layout-static-inactive': true,
        'layout-mobile-active': true,
      });

      layoutService.state.isMenuDesktop = false;
      layoutService.state.isMenuMobile = true;

      expect(component.containerClass).toEqual({
        'layout-static-inactive': false,
        'layout-mobile-active': true,
      });

      layoutService.state.isMenuDesktop = true;
      layoutService.state.isMenuMobile = false;

      expect(component.containerClass).toEqual({
        'layout-static-inactive': true,
        'layout-mobile-active': false,
      });

      layoutService.state.isMenuDesktop = false;
      layoutService.state.isMenuMobile = false;

      expect(component.containerClass).toEqual({
        'layout-static-inactive': false,
        'layout-mobile-active': false,
      });
    });
  });
});
