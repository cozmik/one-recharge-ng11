import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormGroupDirective} from '@angular/forms';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../../shared/Constants';
import '../../../shared/components/custom-alert/custom-alert.component';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../core/services/error_service/error.service';

@Component({
  selector: 'app-agent-sign-up',
  templateUrl: './agent-sign-up.component.html',
  styleUrls: ['./agent-sign-up.component.scss'],
  providers: [AuthService]
})
export class AgentSignUpComponent implements OnInit {

  @ViewChild('confirm_password') confirmPasswordVC: ElementRef;
  @ViewChild('altMobileNo') altMobileNo: ElementRef;
  @ViewChild(FormGroupDirective) agentSignUpFormVC;

  public agentSignUpForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  public signUpText: string;
  public staySignedUp = false;
  public vendorTitle: string = Constants.VENDOR;

  public status: number;
  public creatingAccount: boolean;
  public errorMsg: any;

  public isRegistrationSuccessful: boolean;
  public registrationEmail: string;


  constructor(public router: Router, public auth: AuthService, public error: ErrorService,
              public fb: FormBuilder, public sharedService: SharedService,
              public errorHandler: ErrorService,
              public toast: ToastService) {
    this.creatingAccount = false;
    this.isRegistrationSuccessful = false;
    this.signUpText = 'Sign up';
    this.createForm();
  }

  ngOnInit(): void {

  }


  createForm(): void {
    this.agentSignUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      altMobileNo: ['', [Validators.pattern(this.mobnumPattern), Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  checkMobileNo(): void {
    if (this.agentSignUpForm.value.mobileNo.length > 1 && this.agentSignUpForm.value.mobileNo.length  !==  11) {
      this.agentSignUpForm.controls.mobileNo.setErrors({numberValid: true});
    }
  }

  checkAltMobileNo(): void {
    if (this.agentSignUpForm.value.altMobileNo.length > 1 && this.agentSignUpForm.value.altMobileNo.length  !==  11) {
      this.agentSignUpForm.controls.altMobileNo.setErrors({minLength: true});
    }
  }


  isPasswordMatched = () => {
    return this.agentSignUpForm.value.password === this.agentSignUpForm.value.confirm_password;
  }

  onSubmit(): void {
    // console.log(this.staySignedUp);
    const passwordMatched = this.isPasswordMatched();
    if (!passwordMatched){
      this.toast.showError('Passwords does not match', 'Password Mismatch');
      this.creatingAccount = false;
    }else{
      this.creatingAccount = true;
      this.signUpText = 'Creating Account...';
      this.createAccount();
    }
  }

  /**
   * authenticate user
   */
  public createAccount(): void {
    const formData = new FormData();

    // console.log(this.agentSignUpForm.value);

    this.creatingAccount = true;
    this.auth.createAgentSelf(this.agentSignUpForm.value, formData).subscribe(
        data => {
          this.creatingAccount = false;
          console.log('reg data');
          console.log(data);
          this.registrationEmail = data.data[0].email;
          this.isRegistrationSuccessful = true;
          this.resetForm();
          this.agentSignUpForm.enable();
          this.signUpText = 'Sign up';
          this.toast.showSuccess('Account created successfully', 'Success');

        },
        err => {
          const errorText = this.errorHandler.errorHandlerWithText(this.createAccount, err);
          this.creatingAccount = false;
          this.signUpText = 'Sign up';
          console.log('err', err);
          console.log('errorText', errorText);
          this.toast.showError(errorText.message, 'Error');
          this.agentSignUpForm.enable();
        },
      );
  }

  /**
   * navigate to agent dashboard
   */
  public navigate(): void {
    this.router.navigate([Constants.ADMIN_DASHBOARD]);
    this.creatingAccount = false;
    this.signUpText = 'Sign in';
  }

  resetForm(): void {
    this.agentSignUpFormVC.resetForm();
    this.agentSignUpFormVC.form.markAsPristine();
    this.agentSignUpFormVC.form.markAsUntouched();
    this.agentSignUpFormVC.form.updateValueAndValidity();
  }

}
