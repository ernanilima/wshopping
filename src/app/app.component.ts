import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public static get APPLICATION_NAME(): string {
    return document.title || 'WShopping';
  }
}
