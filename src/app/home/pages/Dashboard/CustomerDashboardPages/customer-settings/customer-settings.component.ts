import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../../../shared/Constants';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.scss']
})
export class CustomerSettingsComponent implements OnInit {

  pageTitle = 'Profile';
  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public message: any;
  public isNotEdit: boolean;
  public edit_text: string;
  public isUpdating : boolean;
  public profile: any;
  public userFormData: any = {
    lastName: '',
    firstName: '',
    mobile: '',
    email: '',
  };


  changePasswordForm: FormGroup;
  confirmPassword: string;
  public changePasswordStatus: boolean;
  password: string;

  constructor( public sharedService: SharedService, public router: Router,  public fb: FormBuilder, public anonymousService: AnonymousService,
               public userService: UserService, public authService: AuthService, public toast: ToastService, public error: ErrorService) {

    this.sharedService.emitChange(this.pageTitle);
    this.profile = JSON.parse(localStorage.getItem(Constants.PROFILE));
    this.switchCreate = true;
    this.isNotEdit = true;
    this.edit_text = 'Edit Profile';
    this.isUpdating = false;
    this.initializeForm();

    this.changePasswordStatus = false;
    this.createForm();
  }

  ngOnInit(): void {
    console.log('*************** profile details **************');
    console.log(this.profile);
  }

  onSubmit(): void {
    console.log(this.userFormData);
    this.updateUser();
  }

  public initializeForm(): void{
    this.userFormData.firstName = this.profile.firstName;
    this.userFormData.lastName = this.profile.lastName;
    this.userFormData.mobile = this.profile.mobile;
    this.userFormData.email = this.profile.email;
  }

  getProfile = () => {
    this.sharedService.getProfile(this.profile.email).subscribe(
      response => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem(Constants.PROFILE, '');
          localStorage.setItem(Constants.PROFILE, JSON.stringify(response));
        }
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getProfile, err);
        console.log(err);
      }
    )
  }

// update users
  updateUser = () => {
    this.isUpdating = true;
    this.userService.updateCustomer(this.userFormData, this.profile.id).subscribe(
      response => {
        if (response.status === 200) {
          this.isUpdating = false;
          this.userDataResponse = response.data;
          this.message = Constants.USER_UPDATED_SUCCESSFULLY;
          this.editToggle();
          this.toast.showSuccess(this.message, 'Success');
          this.getProfile();
        }
      },
      err => {
        this.isUpdating = false;
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.updateUser, err);
        console.log(msg.errorMsg);
        this.toast.showError(msg.message, 'Error');
      }
    )
  }


  editToggle() {
    if (this.isNotEdit) {
      this.edit_text = 'Cancel';
      this.isNotEdit = false;
    } else {
      this.isNotEdit = true;
      this.edit_text = 'Edit Profile';
    }
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



  onSubmitPassword() {
    this.changePassword();
    this.changePasswordStatus = true;
  }



  changePassword() {
    this.authService.changePassword(this.changePasswordForm.value).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.toast.showSuccess(data.message, '');
          setTimeout(()=>{
            this.authService.logout();
          }, 2000)

        }
      },
      err => {
        console.log(err);
        this.changePasswordStatus = false;
        console.log(this.error.errorHandlerWithText(this.changePassword, err));
        // const msg = this.error.errorHandlerWithText(this.changePassword, err);
       // this.toast.showError(msg.message, 'Error');
      }
    )
  }

}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password  !==  confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
      return null
    }
  }
}
