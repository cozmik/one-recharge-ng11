import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  confirmPassword: string;
  public changePasswordStatus: boolean;
  password: string;
  pageTitle = 'Change Password';

  constructor( public authService: AuthService, public router: Router, public fb: FormBuilder,
               public error: ErrorService, public toast: ToastService, public sharedService: SharedService) {
    this.sharedService.emitChange(this.pageTitle);
    this.changePasswordStatus = false;
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }



  onSubmit(): void {
    this.changePassword();
    this.changePasswordStatus = true;
  }



  changePassword(): void {
    this.authService.changePassword(this.changePasswordForm.value).subscribe(
      data => {
        // console.log(data);
        if (data.status === 200) {
          this.toast.showSuccess(data.message, '');
          setTimeout(() => {
            this.authService.logout();
          }, 2000 );

        }
      },
      err => {
        // console.log(err);
        this.changePasswordStatus = false;
        const msg = this.error.errorHandlerWithText(this.changePassword, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }
}


export class PasswordValidation {

  static MatchPassword(AC: AbstractControl): void {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password  !==  confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}
