import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpConfigInterceptor implements HttpConfigInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = localStorage.getItem('lang') || 'vi';
    const token = this.tokenService.getToken();
    request = request.clone({
      setHeaders: {
        'Accept-Language': lang,
      },
    });
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error['status'] === 403) {
          this.tokenService.removeToken();
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      }),
    );
  }
}
