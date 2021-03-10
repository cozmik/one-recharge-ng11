import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../../../core/services/users-service/user-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../../../core/services/error_service/error.service';
import '../../../../../../../shared/components/custom-alert/custom-alert.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  public isEdit: boolean;
  public viewInfo: boolean;
  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public error: any;
  public message: any;
  public isNotEdit: boolean;
  public editText: string;
  public isloading: boolean;
  public pageTitle: string;
  public recentAgentTransactions: any;
  public isLoadingrecentTransactions: boolean;

  public allLoading: any = {
    profile: true,
    transaction: true,
    roles: true
  };

  public userFormData: any = {
    roleId: '',
    mainWallet: '',
    commissionWallet: '',
    dateCreated: '',
    lastLogin: '',
    lastName: '',
    firstName: '',
    mobileNo: '',
    altMobileNo: '',
    email: '',
    blocked: ''
  };

  public updateData: any = {
    email : ' ',
    firstName : '',
    lastName : '',
    mobile : ''
  };

  errorResponse: any;

  public userData: any;
  public blockingText: string;
  public userId: number;
  public isBlocked: any;


  constructor(public sharedService: SharedService, public router: Router,
              public anonymousService: AnonymousService, public errorHandler: ErrorService,
              public agentService: UserService, public toast: ToastService,
              public activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe(params => {
      this.userId = +params.id;
    });

    this.userFormData.mainWallet = 0;
    this.userFormData.commissionWallet = 0;
    this.recentAgentTransactions = [];

    this.isloading = false;
    this.isLoadingrecentTransactions = true;
    this.getRoles();
    this.sharedService.emitChange(this.pageTitle);
    this.switchCreate = true;

    // Inverted the block logic to make colored button signify active //////////////////////////////
    this.isEdit = false;
    this.getRoles();
    this.isNotEdit = true;
    this.editText = 'Edit Profile';
    this.viewInfo = true;
    this.getUser();

  }

  ngOnInit(): void {
    this.getRecentTransactions();
  }


  //  Initialize form //////////////////////////////////////////
  public initializeForm(): void{
    const formData = this.userFormData;

    const profile = this.userData;
    formData.roleId = this.userId;
    formData.mainWallet = profile.walletBalance;
    formData.commissionWallet = profile.walletCommissionBalance;
    formData.dateCreated = profile.createdDate;
    formData.lastLogin = profile.lastLoginDate;
    formData.firstName = profile.firstName;
    formData.lastName = profile.lastName;
    formData.mobileNo = profile.mobile;
    formData.altMobileNo = profile.altMobileNo;
    formData.email = profile.email;
    formData.blocked = profile.disabled;

    this.updateData.email = profile.email;
    this.updateData.firstName = profile.firstName;
    this.updateData.lastName = profile.lastName;
    this.updateData.mobile  = profile.mobile;
  }

  onSubmit(): void {
    this.updateCustomer();
  }
  // update users
  updateCustomer(): void {

    this.isNotEdit = true;
    this.isloading = true;
    this.agentService.updateCustomer(this.updateData, this.userId).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status === 200) {
          this.userDataResponse = data;
          this.message = 'Customer\'s Profile updated successfully';
          this.toast.showSuccess(this.message, 'Success');
        }
        this.isloading = false;
      },
      err => {
        this.error = this.errorHandler.errorHandlerWithText(this.updateCustomer, err);
        console.log('******* Error *******');
        this.error = this.error.message;
        console.log(this.error);
        this.isloading = false;
        this.isNotEdit = false;
      }
    );
  }



  // get roles
  getRoles(): void {
    this.anonymousService.getRoles().subscribe(
      (response: any) => {
        console.log('get roles function');
        console.log(response.data);
        this.roles = response.data;

        this.allLoading.roles = false;
      },
      err => {
        console.log(err);
        this.error.errorHandlerWithText(this.getRoles, err);
      }
    );
  }


  public getRecentTransactions(): void {
    this.anonymousService.getUserTransactions(this.userId).subscribe(
      (response: any) => {
        console.log('get user tranx');
        this.recentAgentTransactions = response.data[0].content;
        console.log('******************* ******************************');
        console.log(this.recentAgentTransactions);
        this.isLoadingrecentTransactions = false;

        this.allLoading.transaction = false;
      },
      err => {
        console.log(err);
        this.isLoadingrecentTransactions = false;
        this.errorResponse = this.error.errorHandlerWithText(this.getRecentTransactions, err);
      }
    );
  }


  public getUser(): void {
    this.anonymousService.getUser(this.userId).subscribe(
      (response: any) => {
        console.log('get user function');
        this.userData = response;
        console.log(this.userData);

        this.allLoading.profile = false;

        this.initializeForm();
        console.log('******************* ******************************');
        console.log(this.userData);
        console.log(this.userFormData.blocked);

        if (this.userFormData.blocked) {
          this.isBlocked = false;
          this.blockingText = 'Blocked';
        } else {
          this.isBlocked = true;
          this.blockingText = 'Unblocked';
        }
        console.log(this.userFormData);
      },
      err => {
        console.log(err);
        this.error.errorHandlerWithText(this.getUser, err);

      }
    );
  }

  editProfile(): void {
    if (this.isNotEdit) {
      this.isNotEdit = false;
    } else {
      this.isNotEdit = true;
    }
  }

}
