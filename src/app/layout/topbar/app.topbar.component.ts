import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
  @ViewChild('menubutton') public menuButton: ElementRef;

  public applicationName = AppComponent.APPLICATION_NAME;

  constructor(public layoutService: LayoutService) {}
}
