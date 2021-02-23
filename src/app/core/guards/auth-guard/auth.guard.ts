import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // add the service we need
  constructor( private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // handle any redirects if a user isn't authenticated
    if (!localStorage.getItem(Constants.ACCESS_TOKEN)){
      // redirect the user
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }

}
