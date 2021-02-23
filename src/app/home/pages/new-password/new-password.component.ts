import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../../shared/Constants';
import {ToastService} from '../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../core/services/error_service/error.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  isChanging = false;
  public res;
  public token: string;
  public password: any = {
    password: '',
    confirmPassword: '',
    verificationToken: ''
  };
  public vendorTitle: string = Constants.VENDOR;
  error: string;

  constructor( public router: Router, public authService: AuthService,
               public errorHandler: ErrorService,
               public toast: ToastService,
               public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.token = params.token;
      this.password.verificationToken = this.token;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): boolean{
    // console.log('token',this.token);
    // console.log(this.password.password);
    // console.log(this.password.confirmPassword);

    if (!(this.password.password.length >= 4)) {
      this.toast.showError('Password length must be greater than 4', 'Password Too Short');
      return false;
    }

    if (!(this.password.password === this.password.confirmPassword)){
      this.toast.showError('Passwords are not the same', 'Password Mismatch');
      return false;
    }
    this.createPassword();
  }


// create password
  createPassword(): void {

    this.isChanging = true;

    this.authService.createPassword(this.password).subscribe(
      data => {
        console.log(data);
        this.res = data;
        this.toast.showSuccess('Password Created Successfully, redirecting ...', '');
        this.isChanging = false;
        setTimeout(() => {
          this.router.navigate([Constants.SIGNIN_URL]);
        }, 2000);
      },
      err => {
        this.error = this.errorHandler.errorHandlerWithText(this.createPassword, err);
        // console.log(err);
        this.toast.showError(err.error.message, err.error);
        this.isChanging = false;
      }
    );
  }
}
