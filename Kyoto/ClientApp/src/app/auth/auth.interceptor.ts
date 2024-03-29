import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators"
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedRequest).pipe(
        tap(
          success => {},
          error => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigateByUrl('/user/login');
            } else if (error.status === 403) {
              this.router.navigateByUrl('/forbidden'); //shold navigate to a forbidden message page
            }
          }

        )
      )
    } else {
      return next.handle(req.clone());
    }
  }
}
