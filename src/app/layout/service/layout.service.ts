import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutState } from '../interface/layout-state.interface';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _overlayOpen = new Subject<unknown>();

  public overlayOpen$ = this._overlayOpen.asObservable();

  public state: LayoutState = {
    isMenuDesktop: false,
    isMenuMobile: false,
  };

  public onMenuToggle(): void {
    if (this._isDesktop()) {
      this.state.isMenuDesktop = !this.state.isMenuDesktop;
      return;
    }

    this.state.isMenuMobile = !this.state.isMenuMobile;

    if (this.state.isMenuMobile) {
      this._overlayOpen.next(null);
    }
  }

  private _isDesktop(): boolean {
    return window.innerWidth > 991;
  }
}
