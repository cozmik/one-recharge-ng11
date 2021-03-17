import {Injectable} from '@angular/core';
import {Constants} from '../../../shared/Constants';
import {Router} from '@angular/router';
import {User} from '../../mocks/user/user.model';
import {HelperFunctions} from '../../../shared/HelperFunctions';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public router: Router) {
  }
// make auth
  public getProfile(): User{
    if (JSON.parse(localStorage.getItem(Constants.PROFILE))  !==  null){
      return new User(JSON.parse(localStorage.getItem(Constants.PROFILE)));
    }
    else {
      return null;
    }
  }



   isPermitted(args: any): any{
    const permissions = [];
    // extract permissions name and store in array
    this.getProfile().role.permissions.forEach((perm) => {
      permissions.push(perm.name);
    });
     // console.log('permissions', permissions);
    return HelperFunctions.isElementsExistsInArray(args, permissions);
  }

  // logout service
  logout(): void {
    localStorage.removeItem(Constants.PROFILE);
    localStorage.removeItem(Constants.ACCESS_TOKEN);
    localStorage.removeItem(Constants.REFRESH_TOKEN);
    location.reload();
    this.router.navigate([Constants.SIGNIN_URL]);
  }

}
