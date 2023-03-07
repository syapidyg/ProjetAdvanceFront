/**
 * Copyright (c) 2022, Iforce5, All Right Reserved.
 * https://iforce5.com
 *
 * When: @created 05/juillet/2022 -- 16:38
 * By :  @author Fabrice Luther on 05/07/2022
 * Project : @project ivindo
 * Package : @package
 */
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';
const LANG_KEY = 'codeIsoLang';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const loginPath = '/session/login'
        const token = this.token.getToken();
        if (token != null ) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authReq).pipe(tap(() => {},
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401 || window.location.pathname === loginPath) {
                        return;
                    }
                    this.token.signOut();
                    window.location.href = loginPath;
                }
            }
        ));
    }
}


export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
