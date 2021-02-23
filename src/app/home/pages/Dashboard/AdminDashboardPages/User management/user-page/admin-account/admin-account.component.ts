import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {Constants} from '../../../../../../../shared/Constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../../core/services/users-service/user-service';
import {AuthService} from '../../../../../../../core/authentication/auth-service.service';
import {ToastService} from '../../../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../../../core/services/error_service/error.service';
import {User} from "../../../../../../../core/mocks/user/user.model";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {
  pageTitle = 'Profile';
  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public resMsg: any;
  public message: any;
  public isNotEdit: boolean;
  public edit_text: string;
  public userId : number;
  public isLoadingProfile : boolean;

  public profile: any;
  public userFormData: any = {
    lastName: '',
    firstName: '',
    mobile: '',
    email: '',
    roleId: ''
  };

  constructor( public sharedService: SharedService, public router: Router, public anonymousService: AnonymousService,
               public agentService: UserService, public authService: AuthService, public activatedRoute: ActivatedRoute, public toast: ToastService, public error: ErrorService) {

    this.sharedService.emitChange(this.pageTitle);
    this.activatedRoute.parent.params.subscribe(params => {this.userId = +params['id']; })
    this.switchCreate = true;
    this.getRoles();
    this.isNotEdit = true;
    this.edit_text = 'Edit Profile';
  }

  ngOnInit(): void {
    // console.log('*************** user Id **************', this.userId);
    this.getProfile();
  }

  onSubmit(): void {
    // console.log(this.userFormData);
    this.updateUser();
  }

  public initializeForm(): void{
    this.userFormData.firstName = this.profile.firstName;
    this.userFormData.lastName = this.profile.lastName;
    this.userFormData.mobile = this.profile.mobile;
    this.userFormData.email = this.profile.email;
    this.userFormData.address = this.profile.address;
    this.userFormData.roleId = this.profile.role.id;
  }

  getProfile = () => {
    this.isLoadingProfile = true;
    this.agentService.getUser(this.userId).subscribe(
      response => {
        // console.log('******* user profile ********');
        this.profile = new User(response.data[0]);
        // console.log(this.profile);
        this.initializeForm();
        this.isLoadingProfile = false;
      },
      err => {
        // console.log(err);
        const msg = this.error.errorHandlerWithText(this.updateUser, err);
        // console.log('Agent profile failed response');
        // console.log(err);
        this.isLoadingProfile = false;
      }
    )
  }

// update users
  updateUser = () => {
    this.agentService.updateAdmin(this.userFormData, this.userId).subscribe(
      response => {
        if (response.status === 200) {
          this.userDataResponse = response.data;
          this.message = Constants.USER_UPDATED_SUCCESSFULLY;
          this.editToggle();
          this.toast.showSuccess(this.message, 'Success');
          this.getProfile();
        }
      },
      err => {
        // console.log(err);
        const msg = this.error.errorHandlerWithText(this.updateUser, err);
        // console.log(msg.errorMsg);
        this.toast.showError(msg.message, 'Error');
      }
    )
  }

  // get roles
  getRoles = () => {
    this.anonymousService.getRoles().subscribe(
      response => {
        // console.log("get roles function")
        // console.log(response);
        this.roles = response.data;
      },
      err => {
        // console.log(err);
        const msg = this.error.errorHandlerWithText(this.getRoles, err);
        // console.log(msg.message);
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

}
