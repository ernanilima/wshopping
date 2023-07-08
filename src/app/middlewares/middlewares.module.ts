import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResponseStatusInterceptorProvider } from './response-status.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [ResponseStatusInterceptorProvider, MessageService],
})
export class MiddlewaresModule {}
