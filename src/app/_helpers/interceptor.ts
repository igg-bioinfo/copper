import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                let token = localStorage.getItem('token') || '';
                //console.log(token +' iiil tok');
                //console.log(request.url)
                if ( token != '' && !request.url.endsWith('/subjectLogin')) {
                        request = request.clone({
                                setHeaders: { 
                                        Authorization: `Bearer ${token}`
                                }
                        });
                }
                return next.handle(request);
        }
}