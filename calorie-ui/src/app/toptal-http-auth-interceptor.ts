import { ToptalAuthService } from './services/toptal-auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToptalHttpInterceptorService implements HttpInterceptor {
  constructor(private auth: ToptalAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authToken = this.auth.getToken();
    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
    return next.handle(req);
  }
}
