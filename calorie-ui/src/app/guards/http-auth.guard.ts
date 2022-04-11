import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToptalAuthService } from '../services/toptal-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ToptalAuthGuard implements CanActivate {
  constructor(private authService: ToptalAuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userData = this.authService.getSession();
    if (!this.authService.isAuthenticated()) {
      if (state.url !== '/') {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else if (this.authService.isAuthenticated()) {
      if (state.url === '/login') {
        this.router.navigate(['/']);
        return false;
      }
      if (state.url === '/admin-dashboard' && !userData.isAdmin) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    return false;
  }
}
