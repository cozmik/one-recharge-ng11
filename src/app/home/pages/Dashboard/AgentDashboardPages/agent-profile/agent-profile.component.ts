import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../../../shared/Constants';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.scss']
})
export class AgentProfileComponent implements OnInit {

  pageTitle = 'Profile';
  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public message: any;
  public isNotEdit: boolean;
  public edit_text: string;
  public isUpdating;

  public profile: any;
  public userFormData: any = {
    lastName: '',
    firstName: '',
    address: '',
    mobile: '',
    email: '',
    roleId: ''
  };

  constructor( public sharedService: SharedService, public router: Router, public anonymousService: AnonymousService,
               public agentService: UserService, public authService: AuthService, public toast: ToastService, public error: ErrorService) {

    this.sharedService.emitChange(this.pageTitle);
    this.profile = JSON.parse(localStorage.getItem(Constants.PROFILE));
    this.switchCreate = true;
    this.getRoles();
    this.isNotEdit = true;
    this.isUpdating = false;
    this.edit_text = 'Edit Profile';
    this.initializeForm();
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
    this.userFormData.mobileNo = this.profile.mobile;
    this.userFormData.email = this.profile.email;
    this.userFormData.address = this.profile.address;
    this.userFormData.roleId = this.profile.role.id;
  }

  getProfile = () => {
    this.sharedService.getProfile(this.profile.email).subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem(Constants.PROFILE, '');
          localStorage.setItem(Constants.PROFILE, JSON.stringify(response));
        }
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getProfile, err);
        console.log('Agent profile failed response');
        console.log(err);
      }
    );
  }

// update users
  updateUser = () => {
    this.isUpdating = true;
    this.agentService.updateAgent(this.userFormData, this.profile.id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.userDataResponse = response.data;
          this.editToggle();
          this.toast.showSuccess('Profile updated successfully', 'Success');
          this.isUpdating = false;
          this.getProfile();
        }
      },
      err => {
        console.log(err);
        this.isUpdating = false;
        this.toast.showError(err, 'Error');
      }
    );
  }

  // get roles
  getRoles = () => {
    this.anonymousService.getRoles().subscribe(
      (response: any) => {
        console.log('get roles function');
        console.log(response);
        this.roles = response.data;
      },
      err => {
        console.log(err);
        // const msg = this.error.errorHandlerWithText(this.getRoles, err);
       // console.log(msg.message);
      }
    );
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
  //
  // changePassword() {
  //   this.router.navigate(['admin/change-password']);
  // }

}
