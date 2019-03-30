import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const hasIdentity = this.auth.hasIdentity();

    if (hasIdentity) {
      this.router.navigate(['/conversations']);
    }

    return !hasIdentity;
  }
}
