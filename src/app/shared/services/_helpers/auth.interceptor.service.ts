import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../Constants';

@Injectable({
  providedIn: 'root'
})
export class Auth implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken;
    let authReq;
    if ((req.headers.get('No-auth') === 'True') && (req.headers.get('TokenRefresh') === 'False')) {
      return next.handle(req.clone());
    } else {
      if (req.headers.get('No-auth') === 'False') {
        authToken = this.auth.getAuthorizationToken();
        authReq = req.clone({
          headers: req.headers.set('Authorization', authToken),
        });
      } else if (req.headers.get('TokenRefresh') === 'True') {
        authToken = localStorage.getItem(Constants.REFRESH_TOKEN);
        authReq = req.clone({
          headers: req.headers.set('Refresh-Token', authToken),
        });
      }
      // Get the auth token from the service.

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
  }
}
