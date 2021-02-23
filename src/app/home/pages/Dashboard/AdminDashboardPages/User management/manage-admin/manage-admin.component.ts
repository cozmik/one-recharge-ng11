import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Constants} from '../../../../../../shared/Constants';
import {Admin} from '../../../../../../core/mocks/user/admin.model';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['../../../../../../core/shared/custom-card.scss', './manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  p = 1;
  public vAll: boolean;
  public activeUser: boolean;

  public adminWithId = [];

  public setId = null;
  public isBlocked: boolean;
  public agents: any;
  public isloading: boolean;
  public isLoadingAdmins: boolean;
  public errorResponse: any;
  pageTitle = 'Manage Admins';
  searchText = '';

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;

  public isLoading: boolean;
  public admins: any;


  constructor(public agentService: UserService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.vAll = true;
    this.isLoading = false;
    this.getAllAdmins(true);
    this.isActiveTicked = true;
    this.isBlockedTicked = true;

  }

  ngOnInit(): void {
  }


// get admin id
  getId(adminId, isblocked, active): number {
    this.setId = adminId;
    this.isBlocked = isblocked;
    this.activeUser = active;
    return this.setId;
  }
// view dashboard
  viewProfile(uId, s): void {
    this.router.navigate(['admin/profile/' + uId + '/view' ]);
  }
  // View profile
  editUserProfile(): void {
    this.router.navigate(['admin/profile/' + this.setId + '/view']);
  }

// block user
  blockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log('Block user:' + userId);
    this.agentService.blockUser(this.setId).subscribe(
      response => {
        console.log(response.data);
        this.getAllAdmins(false);
        this.isloading = false;
        this.toast.showSuccess('User Successfully Blocked', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.blockUser, err);
        this.toast.showError(msg.errorMsg, 'Error');
        this.isloading = false;
      }
    );
  }

// unblock user
  unBlockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log('Block user:' + userId);
    this.agentService.unblockUser(this.setId).subscribe(
      response => {
        console.log(response.data);
        this.getAllAdmins(false);
        this.isloading = false;
        this.toast.showSuccess('User Successfully Unblocked', 'Success');
      },
      err => {
        console.log(err);
        // if error response is due to expired token
        const msg = this.error.errorHandlerWithText(this.unBlockUser, err);
        this.toast.showError(msg.message, 'Error');

      }
    );
  }

// delete agent

  confirmDelete = () => {
    const deleteAction = confirm('Are you sure you want to delete this Agent ?');
    if (deleteAction === true) {
      this.deleteUser();
    } else {
      return false;
    }
  }

  sendActivation = () => {
    // /admins/activation-mail/resend?adminId=22
    this.isloading = true;
    const userId = this.setId;
    console.log('send mail to user:' + userId);
    this.agentService.resendActivationMail(this.setId).subscribe(
      response => {
        console.log(response.data);
        this.getAllAdmins(false);
        this.isloading = false;
        this.toast.showSuccess('Mail Sent Successfully', 'Success');
      },
      err => {
        console.log(err);
        // if error response is due to expired token
        const msg = this.error.errorHandlerWithText(this.unBlockUser, err);
        this.toast.showError(msg.message, 'Error');

      }
    );
  }

  deleteUser = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log(`Delete user:${userId}`);
    this.agentService.deleteUser(this.setId).subscribe(
      response => {
        console.log(response.data);
        this.getAllAdmins(false);
        this.isloading = false;
        this.toast.showSuccess('Admin Successfully Deleted', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.unBlockUser, err);
        this.toast.showError(msg.message, 'Error');      }
    );
  }


  // Fix view index accordingly////////////////////
  getAdminWithId(): void {
    this.adminWithId = [];
    for (let i = 0; i < this.admins.length; i++ ) {
      const sortedAdmins: any = {id: 0, data: {}};
      sortedAdmins.id = i + 1;
      sortedAdmins.data = this.admins[i];
      this.adminWithId.push(sortedAdmins);
    }
    this.isLoadingAdmins = false;
  }


  ////////////////// get all admins info ////////////////////////////////////////////////////
  getAllAdmins = (newLoad = false) => {
    this.isLoadingAdmins = newLoad;
    this.agentService.getAdmins().subscribe(
      response => {
        console.log('admins here');
        this.admins = [];

        const adminId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;
        const admins = response.filter( admin => admin.deleted === 0 && admin.id  !==  adminId);
        admins.forEach((admin) => {
          const dAdmin = new Admin(admin);
          this.admins.push(dAdmin);
        });
        this.getAdminWithId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllAdmins, err);
        this.isLoadingAdmins = false;
        console.log(this.errorResponse);
      }
    );
  }
}
