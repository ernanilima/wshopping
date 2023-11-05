import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AppTopbarComponent } from 'src/app/layout/topbar/app.topbar.component';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild(AppTopbarComponent) private _appTopbar: AppTopbarComponent;

  private _unsubscribeAll = new Subject();

  constructor(
    private _layoutService: LayoutService,
    private _renderer: Renderer2,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this._watchMenuMobile();
    this._watchRouterEvents();
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  protected _watchMenuMobile(): void {
    this._layoutService.openOverlayForMenuMobile$
      .pipe(distinctUntilChanged(), takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._renderer.listen('document', 'click', (event) => {
          const menuButtonElement = this._appTopbar.menuButton.nativeElement;

          const isOutsideClicked = !(
            menuButtonElement.isSameNode(event.target) ||
            menuButtonElement.contains(event.target)
          );

          if (isOutsideClicked) this._hideMenu();
        });
      });
  }

  protected _watchRouterEvents(): void {
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
