import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onMenuToggle', () => {
    it('should return the default state of menu', () => {
      expect(service.state.isMenuDesktop).toBeFalsy();
      expect(service.state.isMenuMobile).toBeFalsy();
    });

    it('should return true for desktop menu for screen size', () => {
      window.innerWidth = 992;
      service.onMenuToggle();
      expect(service.state.isMenuDesktop).toBeTruthy();
      expect(service.state.isMenuMobile).toBeFalsy();
    });

    it('should return true for mobile menu for screen size', () => {
      window.innerWidth = 991;
      service.onMenuToggle();
      expect(service.state.isMenuMobile).toBeTruthy();
      expect(service.state.isMenuDesktop).toBeFalsy();
    });

    it('should return true for desktop and mobile menu for changed screen size without reload', () => {
      window.innerWidth = 992;
      service.onMenuToggle();
      expect(service.state.isMenuDesktop).toBeTruthy();
      expect(service.state.isMenuMobile).toBeFalsy();

      window.innerWidth = 991;
      service.onMenuToggle();
      expect(service.state.isMenuDesktop).toBeTruthy();
      expect(service.state.isMenuMobile).toBeTruthy();
    });
  });

  describe('overlayOpen', () => {
    it('should emit overlayOpen event when isMenuMobile is true', () => {
      const serviceMock = service as any;

      spyOn(serviceMock, '_isDesktop').and.returnValue(false);
      const overlayOpenSpy = spyOn(serviceMock._overlayOpen, 'next');

      service.onMenuToggle();

      expect(overlayOpenSpy).toHaveBeenCalledOnceWith();
    });

    it('should not emit overlayOpen event when isMenuMobile is false', () => {
      const serviceMock = service as any;

      spyOn(serviceMock, '_isDesktop').and.returnValue(true);
      const overlayOpenSpy = spyOn(serviceMock._overlayOpen, 'next');

      service.onMenuToggle();

      expect(overlayOpenSpy).not.toHaveBeenCalled();
    });
  });

  describe('isDesktop', () => {
    it('should return true for desktop view', () => {
      const serviceMock = service as any;

      window.innerWidth = 992;
      expect(serviceMock._isDesktop()).toBe(true);
    });

    it('should return false for mobile view', () => {
      const serviceMock = service as any;

      window.innerWidth = 991;
      expect(serviceMock._isDesktop()).toBe(false);
    });
  });
});
