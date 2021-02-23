import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Constants} from '../../../shared/Constants';
import {StorageService} from '../../services/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {

  userType : any;

  constructor( private router: Router, storage : StorageService ) {

    // this.userType = storage.getProfile().userType;
    // console.log('******************** troubleshoot it here *********************');
    //  // console.log('accessToken', localStorage.getItem(Constants.ACCESS_TOKEN));
    //  // console.log('user type is Agent',  this.userType === Constants.AGENT_USERTYPE );
    //  // console.log('user Match', !(localStorage.getItem(Constants.ACCESS_TOKEN) && this.userType === Constants.AGENT_USERTYPE ));
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
