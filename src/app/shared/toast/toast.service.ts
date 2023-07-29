import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _messageService: MessageService) {}

  public success(content: string): void {
    this._toast('success', 'Success', content, 5000);
  }

  public error(header: string, content: string, delay = 5000): void {
    this._toast('error', header, content, delay);
  }

  private _toast(
    type: string,
    headerMessage: string,
    contentMessage: string,
    delay: number
  ): void {
    this._messageService.clear('BackendResponse');

    this._messageService.add({
      key: 'BackendResponse',
      severity: type,
      summary: headerMessage,
      detail: contentMessage,
      life: delay,
    });
  }
}
