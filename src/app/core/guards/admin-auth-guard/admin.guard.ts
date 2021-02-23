import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from '../../services/storage-service/storage.service';
import {Constants} from '../../../shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userType : any;

  constructor( private router: Router, storage : StorageService ) {

    // this.userType = storage.getProfile().userType;
     // console.log('******************** troubleshoot it here *********************');
     // console.log('accessToken', localStorage.getItem(Constants.ACCESS_TOKEN));
     // console.log('user type is Admin',  this.userType === Constants.ADMIN_USERTYPE );
     // console.log('user Match', !(localStorage.getItem(Constants.ACCESS_TOKEN) && this.userType === Constants.ADMIN_USERTYPE ));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // handle any redirects if a user isn't authenticated
    if (!(localStorage.getItem(Constants.ACCESS_TOKEN))){
      // redirect the user
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}
