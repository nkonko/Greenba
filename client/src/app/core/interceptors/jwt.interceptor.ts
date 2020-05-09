import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
  export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization : `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
  }
