import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss']
})


export class ManageCustomersComponent implements OnInit {

  p = 1;
  public customersWithId = [];

  public setId = null;
  public isBlocked: boolean;
  public customers: any;
  public isloading: boolean;
  public isLoadingCustomers: boolean;
  public errorResponse: any;
  pageTitle = 'Manage Customers';

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;


  constructor(public userService: UserService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService) {
    this.isLoadingCustomers = false;
    this.sharedService.emitChange(this.pageTitle);
    this.getAllCustomers(true);
    this.customers = [];
    this.isActiveTicked = true;
    this.isBlockedTicked = true;

  }

  ngOnInit(): void {
  }



// get agent id
  getId(userId, userStatus): number {
    this.setId = userId;
    this.isBlocked = userStatus;
    return this.setId;
  }
// view dashboard
  viewProfile(userId?: number): void {
    // console.log(userId);
    if (userId){
      this.router.navigate(['admin/customer/' + userId + '/account' ]);
    }
    else{
      this.router.navigate(['admin/customer/' + this.setId + '/account' ]);
    }
  }

// block user
  blockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    // console.log('Block user:' + userId);
    this.userService.blockUser(this.setId).subscribe(
      data => {
        // console.log(data);
        this.getAllCustomers(false);
        this.isloading = false;
        this.toast.showSuccess('Customer  blocked successfully', 'Success');
      },
      err => {
        // console.log(err);
        const msg = this.error.errorHandlerWithText(this.blockUser, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }


// unblock user
  unBlockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    // console.log('Block user:' + userId);
    this.userService.unblockUser(this.setId).subscribe(
      data => {
        // console.log(data);
        this.getAllCustomers(false);
        this.isloading = false;
        this.toast.showSuccess('Customer unblocked successfully', 'Success');
      },
      err => {
        // console.log(err);
        // if error response is due to expired token
        const msg = this.error.errorHandlerWithText(this.unBlockUser, err);
        this.toast.showError(msg.message, 'Error');      }
    );
  }

// delete agent
  deleteUser = () => {
    this.isloading = true;
    const userId = this.setId;
    // console.log(`Delete user:${userId}`);
    this.userService.deleteUser(this.setId).subscribe(
      data => {
        // console.log(data);
        this.getAllCustomers(false);
        this.isloading = false;
        this.toast.showSuccess('Customer Successfully Deleted', 'Success');
      },
      err => {
        // console.log(err);
        const msg = this.error.errorHandlerWithText(this.deleteUser, err);
        this.toast.showError(msg.message, 'Error');      }
    );
  }


  confirmDelete = () => {
    const deleteAction = confirm('Are you sure you want to delete this Customer ?');
    if (deleteAction === true){
      this.deleteUser();
    }else{
      return false;
    }
  }

  // Sort data ////////////////////
  getCustomerWithId() {
    this.customersWithId = [];
    for (let i = 0; i < this.customers.length; i++ ) {
      const sortedAgents: any = {id: 0, data: {}};
      sortedAgents.id = i + 1;
      sortedAgents.data = this.customers[i];
      this.customersWithId.push(sortedAgents);
      this.isLoadingCustomers = false;
    }
    // console.log('************ Customers with id ****************');
    // console.log(this.customersWithId);
  }


  ////////////////// get all customers info ////////////////////////////////////////////////////
  getAllCustomers = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingCustomers = true;
    } else {
      this.isLoadingCustomers = false;
    }
    this.userService.getCustomers().subscribe(
      response => {
        this.isLoadingCustomers = false;
        // console.log('************ Customers list ****************');
        // console.log(response.data);
        this.customers = response.data.filter(customers => customers.deleted  !==  1);
        this.getCustomerWithId();
      },
      err => {
        this.isLoadingCustomers = false;
        // console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllCustomers, err);
        this.isLoadingCustomers = false;
        // console.log(this.errorResponse);

      }
    );
  }
}
