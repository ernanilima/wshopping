import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _messageService: MessageService) {}

  public success(headerMessage: string, contentMessage: string): void {
    this._toast('success', headerMessage, contentMessage);
  }

  public error(headerMessage: string, contentMessage: string): void {
    this._toast('error', headerMessage, contentMessage);
  }

  private _toast(
    type: string,
    headerMessage: string,
    contentMessage: string
  ): void {
    this._messageService.clear('BackendResponse');

    this._messageService.add({
      key: 'BackendResponse',
      severity: type,
      summary: headerMessage,
      detail: contentMessage,
      life: 5000,
    });
  }
}
