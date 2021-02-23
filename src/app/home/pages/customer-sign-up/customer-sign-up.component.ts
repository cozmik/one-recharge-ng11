import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../../shared/Constants';
import '../../../shared/components/custom-alert/custom-alert.component';
import {ErrorService} from '../../../core/services/error_service/error.service';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.scss']
})
export class CustomerSignUpComponent implements OnInit {

  @ViewChild('confirm_password') confirmPasswordVC: ElementRef;
  @ViewChild('altMobileNo') altMobileNo: ElementRef;
  @ViewChild(FormGroupDirective) _customerSignUpForm;

  public customerSignUpForm: FormGroup;

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
    this.customerSignUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  checkMobileNo(): void {
    if (this.customerSignUpForm.value.mobile.length > 1 && this.customerSignUpForm.value.mobile.length  !==  11) {
      this.customerSignUpForm.controls.mobile.setErrors({numberValid: true});
    }
  }

  isPasswordMatched = () => {
    return this.customerSignUpForm.value.password === this.customerSignUpForm.value.confirm_password;
  }

  onSubmit(): void {
    console.log(this.staySignedUp);
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

    console.log(this.customerSignUpForm.value);

    this.creatingAccount = true;
    this.auth.createCustomer(this.customerSignUpForm.value, formData).subscribe(
      data => {
        this.creatingAccount = false;
        console.log('reg data');
        console.log(data);
        this.registrationEmail = data.data[0].user.email;
        this.isRegistrationSuccessful = true;
        this.resetForm();
        this.customerSignUpForm.enable();
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
        this.customerSignUpForm.enable();
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
    this._customerSignUpForm.resetForm();
    this._customerSignUpForm.form.markAsPristine();
    this._customerSignUpForm.form.markAsUntouched();
    this._customerSignUpForm.form.updateValueAndValidity();
  }

}
