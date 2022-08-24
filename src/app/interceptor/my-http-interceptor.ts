import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ignore =
            typeof request.body === 'undefined'
            || request.body === null
            || request.body.toString() === '[object FormData]'
            || request.headers.has('Content-Type');
        if (ignore) {
            request = request.clone({
                setHeaders: {
                    'Content-Language': 'all',
                    Authorization: `${this.authService.getToken()}`,
                },
            });
            return next.handle(request);
        }

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Content-Language': 'all',
                Authorization: `${this.authService.getToken()}`,
            },
        });

        return next.handle(request).pipe(

        );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        return throwError(err);
    }
}
