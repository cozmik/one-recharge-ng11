
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/Constants';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../mocks/user/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) {}
  static refreshTokenSub = new BehaviorSubject<any>(null);
  static refreshTokenInProgress = false;
  currentUser = new BehaviorSubject<User>(null);
  private serviceUrl = Constants.SERVICE_URL;

  saveLoggedInUser(accessToken: string, refreshToken: string, data?: JSON): void {
    if (data) {
      localStorage.setItem(Constants.PROFILE, JSON.stringify(data));
      this.currentUser.next(new User(data));
    }
    localStorage.setItem(Constants.ACCESS_TOKEN, accessToken);
    localStorage.setItem(Constants.REFRESH_TOKEN, refreshToken);
  }

  auth(loginData): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/login' + '?username=' + loginData.username + '&password='
      + loginData.password, {}, Constants.getNoTokenHeaders('false', 'false'))
      .pipe(map(res => {
          // login successful if there's a jwt token in the response
          if (res && res.accessToken) {
            if (res.user.status) {
              this.saveLoggedInUser(res.accessToken, res.refreshToken, res.user);
              return res;
              // store user details and jwt token in local storage to keep user logged in between page refreshes
            } else {
              return Observable.create(sub => {
                sub.error(new Error('This user have been blocked, Contact Admin.'));
              });
            }
          }
        })
      );
  }


  getAuthorizationToken(): string {
    return localStorage.getItem(Constants.ACCESS_TOKEN);
  }

  getRefreshToken(): Observable<any> {
    // Refresh token function here...
    console.log('Refresh here....');
    return this.http.get<string>(Constants.REFRESH_TOKEN_URL, Constants.RefreshTokenHttpHeaders('true', 'false')).pipe(
      res => res );
  }

// get user profile data
  public getProfile(token: string): Observable<any>{
    return this.http.get(Constants.PROFILE_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }
  // get agent profile data
  public getAgentProfile(token: string): Observable<any>{
    return this.http.get(Constants.AGENT_PROFILE_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get customer profile data
  public getCustomerProfile(id: number, token: string): Observable<any>{
    return this.http.get(Constants.USERS_URL + id, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


// reset password
  public resetPassword(email: string): Observable<any>{
    return this.http.get(Constants.RESET_PASSWORD_URL + '?email=' + email, Constants.getRequestHeader()).pipe(
      map(res => res));
  }
// create password
  createPassword(password: any): Observable<any>{
    return this.http.put(Constants.CREATE_PASSWORD_URL, password,  Constants.getRequestHeader());
  }
// create roles
  createRoles(rolesPayload: any): Observable<any>{
    return this.http.post(Constants.CREATE_ROLES_URL, rolesPayload,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }
// update roles
  updateRoles(rolesPayload: any, id: number): Observable<any>{
    return this.http.put(Constants.UPDATE_ROLES_URL + id, rolesPayload,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }
// create super agent

  createAgent(agentData: any, formData): Observable<any> {
    let payload = '';
    for (const key in agentData){
      if (agentData.hasOwnProperty(key)){
        payload += '' + key + '=' + agentData[key] + '&';
      }
    }

    payload = payload.replace(/&+$/g, ''); // remove the trailing &
     // console.log("******* payload ********");
     // console.log(payload);
    return this.http.post(Constants.CREATE_AGENT_URL + payload, formData,
      Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }


  createAgentSelf(agentData: any, formData): Observable<any> {
    let payload = '';
    // console.log(agentData);
    for (const key in agentData) {
      if (agentData.hasOwnProperty(key)) {
        payload += '' + key + '=' + (encodeURIComponent(agentData[key])) + '&';
      }
    }

    payload = payload.replace(/&+$/g, ''); // remove the trailing &

    // console.log(payload);
     // console.log('******* payload ********');
     // console.log(payload);
    return this.http.post(Constants.CREATE_AGENT_SELF_URL + payload,
      formData, Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }

  // create customer
  createCustomer(customerData: any, formData): Observable<any> {
     // console.log("******* payload ********");
     // console.log(customerData);
    return this.http.post(Constants.CREATE_CUSTOMER_URL, customerData,
      Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }


  changePassword(passwordPayload: any): Observable<any> {
    // console.log(passwordPayload);
    return this.http.put(Constants.CHANGE_PASSWORD_URL,
      passwordPayload, Constants.getTokenHttpHeaders('true')).pipe(
      map(res => res));
  }

  // multiple user by uploading sheet
  createMultipleUser(roleId: any, formData: FormData): Observable<any>{
    return this.http.post(Constants.UPLOAD_USER_DATA_URL
      + '?roleId=' + roleId, formData, Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }


// refresh token or get new access token
  refreshToken(): Observable<any>{
    return this.http.get(Constants.REFRESH_TOKEN_URL,
      Constants.getRefreshTokenRequestOption(localStorage.getItem(Constants.REFRESH_TOKEN))).pipe(
      map(res => res));
  }


// save access and refresh token to local storage
  saveToken(accessToken: string, refreshToken: string, callback ?: () => {}): void {
    localStorage.setItem(Constants.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(Constants.ACCESS_TOKEN,  accessToken);
    if (callback){
      callback();
    }
  }
// save user profile to local stirage
  saveProfile(profileData: any): void {
    localStorage.setItem(Constants.PROFILE, profileData);
  }

  public getToken(): string{
    return localStorage.getItem(Constants.ACCESS_TOKEN);
  }

  // public getRefreshToken(): string{
  //   return localStorage.getItem(Constants.REFRESH_TOKEN);
  // }




// logout service
  logout(): void {
    localStorage.clear();
    location.reload();
    this.router.navigate([Constants.SIGNIN_URL]);
  }
}
