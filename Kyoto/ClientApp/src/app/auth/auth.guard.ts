import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): /*Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |*/ boolean /* | UrlTree */{  // we only need boolean right now.
    if (localStorage.getItem('token') != null) {
      let roles = next.data['permittedRoles'] as Array<string>;
      if (roles) {
        if (this.service.roleMatch(roles)) return true;
        else {
          this.router.navigate(['/forbidden']); //should navigate to a message page which displays a "Access Forbidden" message.
          return false;
        }
      }
      return true;
    } else
      this.router.navigate(['/forbidden']);
    return false;

  }
  
}
