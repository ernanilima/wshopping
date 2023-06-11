import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  menuMode: string;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _overlayOpen = new Subject<unknown>();

  public overlayOpen$ = this._overlayOpen.asObservable();

  public config: AppConfig = {
    menuMode: 'static',
  };

  public state: LayoutState = {
    staticMenuDesktopInactive: false,
    staticMenuMobileActive: false,
  };

  public onMenuToggle(): void {
    if (this._isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this._overlayOpen.next(null);
      }
    }
  }

  private _isDesktop(): boolean {
    return window.innerWidth > 991;
  }
}
