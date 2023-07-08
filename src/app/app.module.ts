import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  providers: [TitleCasePipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
