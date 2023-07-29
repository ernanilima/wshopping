import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class ResponseStatusInterceptor implements HttpInterceptor {
  constructor(private _toastService: ToastService) {}

  public intercept(
    request: HttpRequest<HttpResponseBase>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpResponseBase>> {
    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse && response.body['message']) {
          this._backendResponseMessage(response);
        }
        return response;
      }),
      catchError((response: HttpErrorResponse) => {
        this._backendResponseMessage(response);

        if (response.error) {
          response = response.error;
        }
        return throwError(() => response);
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
    const successStatus: boolean =
      json.status && json.status >= 200 && json.status <= 299;

    const errorStatus: boolean =
      json.status && json.status >= 400 && json.status <= 599;

    if (successStatus) {
      const response = (json as HttpResponse<never>).body;
      return this._toastService.success(response['message']);
    }

    if (errorStatus) {
      const response = (json as HttpErrorResponse).error;
      return this._errorMessage(response.error, response.message);
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
