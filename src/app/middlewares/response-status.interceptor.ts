import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ResponseStatusInterceptor implements HttpInterceptor {
  constructor(private _messageService: MessageService) {}

  public intercept(
    request: HttpRequest<HttpResponseBase>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((json: HttpErrorResponse) => {
        this._backendResponseMessage(json);

        if (json.error) json = json.error;
        return throwError(() => json);
      })
    );
  }

  /**
   * Respostas de informacao (100-199)
   * Respostas de sucesso (200-299)
   * Redirecionamentos (300-399)
   * Erros do cliente (400-499)
   * Erros do servidor (500-599)
   * @param json any
   */
  private _backendResponseMessage(json: HttpResponseBase): void {
    const errorStatus: boolean =
      json.status && json.status >= 400 && json.status <= 599;

    if (errorStatus) {
      this._messageService.clear('BackendResponseError');
      const backendResponseError = (json as HttpErrorResponse).error;
      this._errorMessage(
        backendResponseError.error,
        backendResponseError.message
      );
    }
  }

  private _errorMessage(headerMessage: string, contentMessage: string): void {
    this._messageService.add({
      key: 'BackendResponseError',
      severity: 'error',
      summary: headerMessage,
      detail: contentMessage,
      life: 5000,
    });
  }
}

export const ResponseStatusInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseStatusInterceptor,
  multi: true,
};