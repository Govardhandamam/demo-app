import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToptalHttpInterceptorService } from './toptal-http-auth-interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ToptalHttpInterceptorService, multi: true }
];
