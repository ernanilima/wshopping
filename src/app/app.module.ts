import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
  TitleCasePipe,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiddlewaresModule } from './middlewares/middlewares.module';

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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
