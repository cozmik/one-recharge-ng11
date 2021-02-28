import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {Constants} from '../../../../../../shared/Constants';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})

export class CreateAdminComponent implements OnInit {
  pageTitle = 'Create Admin';
  public adminForm: FormGroup;

  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public numberExists: any;

  public isloading: boolean;
  public createText: string;

  public errorText: any;
  public successText: string;
  public errorTitle: string;


  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  @ViewChild(FormGroupDirective) myForm;
  public emailExists: any;

  constructor( public sharedService: SharedService, public anonymousService: AnonymousService,
               public snackBar: MatSnackBar, public authService: AuthService, public fb: FormBuilder, public errorService: ErrorService,
               public toast: ToastService, ) {
        this.sharedService.emitChange(this.pageTitle);
        this.switchCreate = true;
        this.getRoles();
        this.isloading = false;
        this.createText = 'Create Admin';
        this.createForm();
  }

  createForm(): void {
    this.adminForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      roleId: ['', [Validators.required]],
    });
  }


  checkNum(): void {
    this.sharedService.checkUser('?mobileNo=' + this.adminForm.value.mobile).subscribe(
      data => {
        this.numberExists = data;
        if (this.numberExists) {
          this.adminForm.controls.mobile.setErrors({numberExists: true});
        }
      }, err => {
          const error = this.errorService.errorHandlerWithText(this.checkNum, err);
          if (error.error === 'Not found') {
            this.numberExists = null;
            return;
          }
      });
  }

  checkEmail(): void {
    this.sharedService.checkUser('?email=' + this.adminForm.value.email).subscribe(
      data => {
        this.emailExists = data;
        if (this.emailExists) {
          this.adminForm.controls.email.setErrors({emailExists: true});
        }
      });
  }

  ngOnInit(): void { }

  // Submit create Admin form
  onSubmit(): void {
    this.isloading = true;
    this.createText = 'Creating Admin...';
    this.adminForm.disable();
    this.createUser();
  }
  // create users
  createUser(): void {
    this.sharedService.createUser(this.adminForm.value, localStorage.getItem(Constants.ACCESS_TOKEN)).subscribe(
      data => {
        this.userDataResponse = data;
        console.log('********** Create User success ***********');
        console.log(data);
        this.successText = Constants.USER_CREATED_SUCCESSFULLY;
        this.isloading = false;
        this.createText = 'Create Admin';
        this.myForm.resetForm();
        this.errorText = null;
        this.adminForm.enable();
        this.toast.showSuccess('Admin created successfully', 'Success');
      },
      err => {
        console.log('********** Create User error ***********');
        console.log(err);
        this.errorText = this.errorService.errorHandlerWithText(this.createUser, err);
        this.isloading = false;
        this.createText = 'Create Admin';
        this.adminForm.enable();
        this.toast.showError(this.errorText.message, 'Error');
      }
    );
  }
  // get roles
  getRoles(): void {
    this.anonymousService.getRoles().subscribe(
      response => {
        this.roles = response;
      });
  }
}
