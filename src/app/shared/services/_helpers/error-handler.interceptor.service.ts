import {Observable, throwError} from 'rxjs';
import {catchError, filter, finalize, retryWhen, switchMap, take} from 'rxjs/internal/operators';
import {incrementalRetry} from './incremental-retry';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../Constants';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class ErrorHandler implements HttpInterceptor {
  private queue: HttpRequest<any>[] = [];
  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | unknown | any> {

    let errorMessage;
    return next.handle(request).pipe(
      retryWhen(incrementalRetry({
        scalingDuration: 2000,
        excludedStatusCodes: [500, 503, 401, 422],
        headerAllow: request.headers.get('retry')
      })),
      catchError((err: HttpErrorResponse) => {
        console.log('Error is here');
        if (err.error instanceof ErrorEvent) {
            errorMessage = `Error: ${err.error.message}`;
          } else {
            if (err.status === 404) {
              console.log('Not Found');
            } else if ((err.status === 0) || (err.status >= 500)) {
              console.log('got to server');
              this.router.navigate(['server-error'], {skipLocationChange: true });
            } else if (err.status === 401) {
              console.log(AuthService.refreshTokenInProgress);
              if (AuthService.refreshTokenInProgress) {
                this.logout();
                this.router.navigate(['sign-in']);
              }
              if (localStorage.getItem(Constants.REFRESH_TOKEN)) {
                if (AuthService.refreshTokenInProgress) {
                  return AuthService.refreshTokenSub.pipe(
                    filter(result => result !== null),
                    take(1),
                    switchMap(() => next.handle(this.addAuthenticationToken(request)))
                  );
                } else {
                  AuthService.refreshTokenInProgress = true;

                  // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                  AuthService.refreshTokenSub.next(null);

                  return this.authService.getRefreshToken().pipe(
                    switchMap((res: any) => {
                      AuthService.refreshTokenSub.next(res);
                      this.authService.saveLoggedInUser(res.accessToken, res.refreshToken);
                      return next.handle(this.addAuthenticationToken(request));
                    }),
                    // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                    finalize(() => AuthService.refreshTokenInProgress = false)
                  );
                }
              } else {
                this.logout();
              }
            }
            // console.log(this.requestQueue);
          }

        const error = err.error.message ? err.error.message : err.statusText;
        if (request.headers.get('popup-error') === 'true') {
          // alert('Error here');
          this.toastService.error(error, 'Error');
        }
        return throwError(error);
      }));
  }

  addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = localStorage.getItem(Constants.ACCESS_TOKEN);
    return req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
  }

  private logout(): void {
    localStorage.clear();
    // location.reload();
  }
}

