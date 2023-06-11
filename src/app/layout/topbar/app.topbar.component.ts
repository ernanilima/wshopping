import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
  @ViewChild('menubutton') public menuButton: ElementRef;

  constructor(public layoutService: LayoutService) {}
}
