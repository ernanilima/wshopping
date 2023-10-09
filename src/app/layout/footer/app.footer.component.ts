import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
  public applicationName = AppComponent.APPLICATION_NAME;
  public developerName = 'Ernani Lima';
  public developerWebsite = 'https://github.com/ernanilima';
}
