import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../core/authentication/auth-service.service';
import {Constants} from '../../../shared/Constants';
import '../../../shared/components/custom-alert/custom-alert.component';
import {ErrorService} from '../../../core/services/error_service/error.service';
import {ToastService} from '../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {

  public signInText: string;
  public staySignedIn = false;
  public vendorTitle: string = Constants.VENDOR;

  // @ViewChild('seePassword') seePassword: ElementRef;

  public authPayload: any = {
    username: '',
    password: ''
  };

  public signInForm: FormGroup;
  public accessToken: string;
  public refreshToken: string;
  public userType: string;
  public status: number;
  public signingIn: boolean;
  public errorMsg: any;
  public profile: any;
  showPass: boolean;


  constructor(public router: Router, public auth: AuthService, public errorHandler: ErrorService,
              public toast: ToastService, public fb: FormBuilder) {
    this.signingIn = false;
    this.signInText = 'Sign in';
    this.createForm();
  }

  ngOnInit(): void {
    // console.log(' *******profile is here*******');

    if (localStorage.getItem(Constants.PROFILE)  !==  null) {

      this.profile = JSON.parse(localStorage.getItem(Constants.PROFILE));
      // console.log(this.profile);

      const userType = this.profile.userType.toLowerCase();

      // check storage userType and redirect where needed;
      this.navigate(userType);
    }
  }

  createForm(): void {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.signingIn = true;
    this.signInText = 'Authenticating...';
    // console.log(this.staySignedIn);
    this.authenticate();
  }

  /**
   * authenticate user
   */
  public authenticate(): void {
    this.auth.auth(this.signInForm.value).subscribe(
      data => {
        // console.log('log in data', data);

        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.userType = data.user.userType;
        // console.log(this.accessToken);
        // console.log(this.refreshToken);
        // console.log(this.userType);
        // console.log(data);

        this.saveToken();

        if (this.accessToken !== null && this.refreshToken !== null) {
          try {
            this.saveProfile(data.user);
          } catch (e) {
            this.toast.showWarning(e, 'Message');
          }
        }
      },
      err => {
        this.errorMsg = this.errorHandler.loggedOutError(err);
        this.signingIn = false;
        this.signInText = 'Sign in';
      },
    );
  }

  private saveProfile(data: any): void {
    // console.log(data);
    this.status = data.status;
    // console.log(data.userType);
    const userType = data.userType.toLowerCase();
    // console.log('user : ' + userType);

    // console.log('status : ' + this.status + ' ' + typeof this.status);
    console.log(data);
    if (this.status === 1) {
      localStorage.setItem(Constants.PROFILE, JSON.stringify(data));
      this.navigate(userType);
    } else {
      localStorage.clear();
      this.errorMsg = 'You have been blocked, Contact Admin.';
      this.signingIn = false;
      this.signInText = 'Sign in';
    }
  }

  /**
   * save token
   */
  public saveToken(): void {
    this.auth.saveToken(this.accessToken, this.refreshToken);
  }


  /**
   * navigate to agent dashboard
   */
  public navigate(user): boolean {
    // console.log('navigate user : ' + user);
    // console.log('is customer : ' + user === 'customer');

    if (user === 'customer'){
      this.router.navigate(['/' + user]);
      this.signingIn = false;
      this.signInText = 'Sign in';
      return false;
    }
    else {
      this.router.navigate(['/' + user + '/dashboard/']);
      this.signingIn = false;
      this.signInText = 'Sign in';
    }
  }
}
