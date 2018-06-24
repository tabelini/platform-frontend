import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {AuthenticationStatus} from 'platform-domain';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private us: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = next.data['roles'] as Array<string>;
    const user = this.us.user$.getValue();
    if (user && user.authenticationStatus === AuthenticationStatus.LOGGED) {
      if (user.hasAnyRole(roles)) {
        return true;
      }
    } else {
      return this.us.tryLoginByToken()
        .then(loggedUser => {
          return true;
        })
        .catch(error => {
          this.router.navigateByUrl('/pages/auth/login-2');
          return false;
        });
    }
  }
}
