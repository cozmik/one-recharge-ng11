import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../../shared/Constants';
import {ErrorService} from '../../../core/services/error_service/error.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public res: any;
  public errorMsg: string;
  public forgotAction: boolean;
  public vendorTitle: string = Constants.VENDOR;

  constructor( public router: Router, public authService: AuthService, public fb: FormBuilder, public error: ErrorService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

// submit form
  onSubmit(): void {
    const email = this.forgotPasswordForm.value.email;
    console.log(email);
    this.resetPassword(email);
    this.forgotAction = true;
  }
  // reset password
  resetPassword(email: string): void {
    this.authService.resetPassword(email).subscribe(
      data => {
        console.log(data);
        this.res = data;
        if (data.status === 200) {
          this.router.navigate([Constants.MAIL_SENT]);
        }
      },
      err => {
        console.log(err);
        this.errorMsg = this.error.loggedOutError(err);
        this.forgotAction = false;
      }
    );
  }
}
