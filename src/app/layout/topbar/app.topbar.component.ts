import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
  constructor(public layoutService: LayoutService) {}
}
