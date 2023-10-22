import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AppSidebarComponent } from 'src/app/layout/sidebar/app.sidebar.component';
import { AppTopbarComponent } from 'src/app/layout/topbar/app.topbar.component';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild(AppSidebarComponent) private _appSidebar: AppSidebarComponent;
  @ViewChild(AppTopbarComponent) private _appTopbar: AppTopbarComponent;

  private _unsubscribeAll = new Subject();

  constructor(
    private _layoutService: LayoutService,
    private _renderer: Renderer2,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this._watchMenuMobile();
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  protected _watchMenuMobile(): void {
    this._layoutService.openOverlayForMenuMobile$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._renderer.listen('document', 'click', (event) => {
          const sidebarElement = this._appSidebar.elementRef.nativeElement;
          const topbarElement = this._appTopbar.menuButton.nativeElement;

          const isOutsideClicked = !(
            sidebarElement.isSameNode(event.target) ||
            sidebarElement.contains(event.target) ||
            topbarElement.isSameNode(event.target) ||
            topbarElement.contains(event.target)
          );

          if (isOutsideClicked) this._hideMenu();
        });
      });

    this._router.events
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => this._hideMenu());
  }

  protected _hideMenu(): void {
    this._layoutService.state.isMenuMobile = false;
  }

  public get containerClass(): Record<string, boolean> {
    return {
      'layout-static-inactive': this._layoutService.state.isMenuDesktop,
      'layout-mobile-active': this._layoutService.state.isMenuMobile,
    };
  }
}
