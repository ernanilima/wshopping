import { Component, Renderer2, ViewChild } from '@angular/core';

import { LayoutService } from 'src/app/layout/service/layout.service';
import { AppSidebarComponent } from 'src/app/layout/sidebar/app.sidebar.component';
import { AppTopbarComponent } from 'src/app/layout/topbar/app.topbar.component';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent {
  @ViewChild(AppSidebarComponent) private _appSidebar: AppSidebarComponent;
  @ViewChild(AppTopbarComponent) private _appTopbar: AppTopbarComponent;

  constructor(
    private _layoutService: LayoutService,
    private _renderer: Renderer2
  ) {
    this._layoutService.overlayOpen$.subscribe(() => {
      this._renderer.listen('document', 'click', (event) => {
        const isOutsideClicked = !(
          this._appSidebar.elementRef.nativeElement.isSameNode(event.target) ||
          this._appSidebar.elementRef.nativeElement.contains(event.target) ||
          this._appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
          this._appTopbar.menuButton.nativeElement.contains(event.target)
        );

        if (isOutsideClicked) {
          this._hideMenu();
        }
      });
    });
  }

  private _hideMenu(): void {
    this._layoutService.state.staticMenuMobileActive = false;
  }

  public get containerClass(): Record<string, boolean> {
    return {
      'layout-static': this._layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this._layoutService.state.staticMenuDesktopInactive &&
        this._layoutService.config.menuMode === 'static',
      'layout-mobile-active': this._layoutService.state.staticMenuMobileActive,
    };
  }
}
