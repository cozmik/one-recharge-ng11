/**
 * Created by Anthony on 17/05/2018.
 */

import {Injectable} from '@angular/core';
import {Constants} from './Constants';
import {Agent} from '../core/mocks/agent/agent.model';
import {User} from '../core/mocks/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }
// make auth
  public getProfile(){
    if(JSON.parse(localStorage.getItem(Constants.PROFILE))  !==  null){
      return new User(JSON.parse(localStorage.getItem(Constants.PROFILE)).data[0]);
    }
    else
      return null;
  }


  // save user profile to local storage
  saveProfile(profileData: any){
    localStorage.setItem(Constants.PROFILE, profileData);
  }

  // logout service
  logout() {
    if(localStorage.clear()){
      return true;
    }
  }

}
