import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const isLoggedIn = this.authService.isLoggedIn();
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
      },
    });
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          authorize_token: token,
        },
      });
    }
    return next.handle(request);
  }
}
