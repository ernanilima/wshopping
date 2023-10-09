import { Component, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
    private _renderer: Renderer2,
    private _router: Router
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

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._hideMenu();
      });
  }

  private _hideMenu(): void {
    this._layoutService.state.isMenuMobile = false;
  }

  public get containerClass(): Record<string, boolean> {
    return {
      'layout-static-inactive': this._layoutService.state.isMenuDesktop,
      'layout-mobile-active': this._layoutService.state.isMenuMobile,
    };
  }
}
