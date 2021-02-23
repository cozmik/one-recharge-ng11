import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {PayoutRequests} from "../../../../../core/mocks/payoutRequests.model";
import {StorageService} from "../../../../../core/services/storage-service/storage.service";

@Component({
  selector: 'app-payout-requests',
  templateUrl: './payout-requests.component.html',
  styleUrls: ['./payout-requests.component.scss']
})
export class PayoutRequestsComponent implements OnInit {

  p = 1;

  public setId = null;
  public isBlocked: boolean;
  public payouts: any;
  public payoutsWithId : any;
  public isloading: boolean;
  public isLoadingPayouts: boolean;
  public errorResponse: any;

  public requestAmount: number;
  public isRequesting = false;

  pageTitle = 'Payout Requests';

  public isActiveTicked : boolean;
  public isBlockedTicked : boolean;


  constructor(public userService: UserService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService, public storage : StorageService) {
    this.isLoadingPayouts = false;
    this.sharedService.emitChange(this.pageTitle);
    this.getAllPayouts(true);
    this.payouts = [];
    this.payoutsWithId = [];
    this.isActiveTicked = true;
    this.isBlockedTicked = true;

  }

  ngOnInit(): void {
     console.log('ispermitted', this.storage.isPermitted('REQUEST_PAYOUT'));
  }

  isUserPermitted(args : any): boolean{
    return this.storage.isPermitted(args);
  }


// approve payout
  approvePayout = (payoutId) => {
    this.isloading = true;
    console.log('approve payout:' + payoutId);
    this.userService.approvePayout(payoutId).subscribe(
      data => {
        console.log(data);
        this.getAllPayouts(true);
        this.isloading = false;
        this.toast.showSuccess('Payout approved successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.approvePayout, err);
        this.toast.showError(msg.message, 'Error');
      }
    )
  }


// confirm Payout
  confirmPayout = (payoutId) => {
    this.isloading = true;
    console.log('payoutId :' + payoutId);
    this.userService.confirmPayout(payoutId).subscribe(
      data => {
        console.log(data);
        this.getAllPayouts(true);
        this.isloading = false;
        this.toast.showSuccess('Payouts confirmed successfully', 'Success');
      },
      err => {
        console.log(err);
        // if error response is due to expired token
        const msg = this.error.errorHandlerWithText(this.confirmPayout, err);
        this.toast.showError(msg.message, 'Error');      }
    )
  }

// decline Payout
  declinePayout = (payoutId) => {
    this.isloading = true;
    console.log(`Decline payout:${payoutId}`);
    this.userService.declinePayout(payoutId).subscribe(
      data => {
        console.log(data);
        this.getAllPayouts(true);
        this.isloading = false;
        this.toast.showSuccess('Payouts Successfully Declined', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.declinePayout, err);
        this.toast.showError(msg.message, 'Error');
      }
    )
  }


  confirmDecline = (payoutId) => {
    const action = confirm('Are you sure you want to decline this Payout ?');
    if (action === true){
      this.declinePayout(payoutId);
    }else{
      return false
    }
  }

  // Sort data ////////////////////

  getPayoutsWithId() {
    this.payoutsWithId = [];
    for (let i = 0; i < this.payouts.length; i++ ) {
      const sortedAgents: any = {id: 0, data: {}};
      sortedAgents.id = i + 1;
      sortedAgents.data = this.payouts[i];
      this.payoutsWithId.push(sortedAgents);
      this.isLoadingPayouts = false;
    }
    console.log('************ Payouts with id ****************');
    console.log(this.payoutsWithId);
  }


  ////////////////// get all payouts info ////////////////////////////////////////////////////
  getAllPayouts = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingPayouts = true;
    } else {
      this.isLoadingPayouts = false;
    }

    this.payouts = [];
    this.userService.getPayouts().subscribe(
      response => {
        console.log('************ Payouts list ****************');

        const payoutLists = response.data;
        payoutLists.forEach((payout) => {
          this.payouts.push(new PayoutRequests(payout));
        })

        console.log(this.payouts);

        this.getPayoutsWithId();

        this.isLoadingPayouts = false;

      },
      err => {
        console.log(err);
        this.isLoadingPayouts = false;
        this.errorResponse = this.error.errorHandlerWithText(this.getAllPayouts, err);
        this.isLoadingPayouts = false;
        console.log(this.errorResponse);

      }
    )
  }


  requestPayout = () => {
    this.isRequesting = true;
    this.userService.requestPayout(this.requestAmount).subscribe(
      data => {
        this.isRequesting = false;
        this.requestAmount = null;
        this.getAllPayouts();
        this.toast.showSuccess('Payouts Request is Successfully', 'Success');
      },
      err => {
        this.isRequesting = false;
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.requestPayout, err);
        this.toast.showError(msg.message, 'Error');
      }
    )
  }

}
