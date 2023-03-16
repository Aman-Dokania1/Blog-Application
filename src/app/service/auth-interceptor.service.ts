import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    const modifiedRequest =
      token == null || token == undefined
        ? req
        : req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token),
          });
    req.url.includes('auth');

    // console.log(modifiedRequest.headers);
    // console.log(modifiedRequest);
    // console.log(modifiedRequest.url);
    return next.handle(modifiedRequest).pipe(
      catchError((error): Observable<any> => {
        if (error instanceof HttpErrorResponse && !req.url.includes('/login')) {
          console.log(error.status);
          console.log(error.statusText);
          if (error.status === 401) {
            window.location.href = '/login';
          }
        }
        return throwError(() => error);
      })
    );
  }
}
