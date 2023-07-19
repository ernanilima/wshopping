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
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class ResponseStatusInterceptor implements HttpInterceptor {
  constructor(private _toastService: ToastService) {}

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
   * @param json HttpResponseBase
   */
  private _backendResponseMessage(json: HttpResponseBase): void {
    const errorStatus: boolean =
      json.status && json.status >= 400 && json.status <= 599;

    if (errorStatus) {
      const response = (json as HttpErrorResponse).error;
      this._errorMessage(response.error, response.message);

      return;
    }

    if (json.status === 0) {
      this._errorMessage(json.statusText, 'Sem acesso a API', 10000);
    }
  }

  private _errorMessage(header: string, content: string, delay?: number): void {
    this._toastService.error(header, content, delay);
  }
}

export const ResponseStatusInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseStatusInterceptor,
  multi: true,
};
