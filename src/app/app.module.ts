import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
  TitleCasePipe,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { BaseResourceService } from './shared/base/base-resource.service';

function initializeApp(service: BaseResourceService): () => void {
  return () => service.updateUrlToApi();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    MiddlewaresModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    TitleCasePipe,
    DatePipe,
    ConfirmationService,
    BaseResourceService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [BaseResourceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
