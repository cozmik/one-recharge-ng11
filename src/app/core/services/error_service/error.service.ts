import {Injectable} from '@angular/core';
import {Constants} from '../../../shared/Constants';
import {AuthService} from '../../authentication/auth-service.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/services/toast-service/toast.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errorResponse: any;
  public accessToken: string;
  public refreshToken: string;

  constructor(public authService: AuthService, public snackBar: MatSnackBar, private router: Router, private toast: ToastService) { }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  public errorHandler(callingFunc, error, loader): void {
    console.log(error);
    if (error.error === Constants.TOKEN_EXPIRED_ERROR) {
      // call refresh token
      this.refreshTokenFunc(callingFunc);
    } else {
      this.errorResponse = JSON.parse(error._body);
      console.log(this.errorResponse);
      this.errorResponse = JSON.parse(error._body);
      this.openSnackBar(this.errorResponse.message, '');
      loader = false;
    }
  }

  public refreshTokenFunc(callingFunc): void {
    this.authService.refreshToken().subscribe(
      (data: any) => {
        // get tokens
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        // save new token
        this.authService.saveToken(this.accessToken, this.refreshToken, () => callingFunc());

        // Call the calling function after saving token
        // callingFunc();
      },
      err => {
        console.log(err);
        this.errorResponse = JSON.parse(err._body);
        // this.toast.showInfo('You are logged out', ' ');
        this.authService.logout();
        return;
      }
    );
  }

  public errorHandlerWithText(callingFunc, error): any {
    console.log(' ***** error block ********** ');
    console.log(error);
    if (error.status === 0) {
      console.log(error);
      this.openSnackBar('Network error!! Check your connection', '');
    }
    else if (error.status === 500) {
      console.log(error);
      this.router.navigate(['page-500']);
    }
    else if (error.status === 403){
      this.openSnackBar('You are not authorized to perform this action', '');
    }
    else if (error.status === 422) {
        const errorResponse = JSON.parse(error._body);
        console.log(errorResponse);
        const mainError = {error: '', message: ''};
        const errorMsg = errorResponse.message;
        mainError.error = errorResponse;
        mainError.message = errorMsg;
        return mainError;
    }
    else if (error.status === 401) {

      if (error instanceof Blob){
        this.refreshTokenFunc(callingFunc);
        return;
      }

      const err = error.error;
      console.log('401 error block', err);
      if (err.error === Constants.TOKEN_EXPIRED_ERROR) {
        // call refresh token
        this.refreshTokenFunc(callingFunc);
      } else {
        this.errorResponse = err;
        console.log(this.errorResponse);
        const mainError = {error: '', message: ''};
        const errorMsg = this.errorResponse.message;
        mainError.error = err;
        mainError.message = errorMsg;
        return mainError;
      }
    }
    else{}
  }




  public loggedOutError(error): string {
    this.errorResponse = JSON.parse(error._body);
    // console.log(this.errorResponse);
    return this.errorResponse.message;
  }
}
