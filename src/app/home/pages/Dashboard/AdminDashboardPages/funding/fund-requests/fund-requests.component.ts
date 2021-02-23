import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {Constants} from '../../../../../../shared/Constants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-fund-requests',
  templateUrl: './fund-requests.component.html',
  styleUrls: ['./fund-requests.component.scss']
})
export class FundRequestsComponent implements OnInit {
  isProofAvailable: boolean;
  isImageAvailable: any;

  errorResponse: any;
  searchText: string;
  p = 0;
  pageTitle = 'Fund Requests';
  public adminsTotal: number;
  public range: string;
  public admins: any;
  public fundRequests: any;
  public isFundRequestsLoaded: boolean;
  public fundRequestsWithId: any;
  public pageSize: any;

  private currency: string;
  private userId: number;
  public fullName: any;
  public Phone: any;
  public email: any;
  public balance: any;
  private amount: number;
  private tellerNo: any;
  private date: any;
  private reqId: number;
  private depositorsName: string;
  private proofOfPayment: string;
  url: string;

  constructor(public sharedService: SharedService, public adminService: UserService, private authService: AuthService,
              private toast: ToastService, private dialog: MatDialog, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);

    this.url = Constants.SERVICE_URL;
    this.range = 'today';
    this.pageSize = '10';
    this.isFundRequestsLoaded = true;
    this.fundRequestsWithId = [];
  }

  // Re-Sort data ////////////////////
  getFundRequestsWithId(): void {
    this.fundRequestsWithId = [];
    for (let i = 0; i < this.fundRequests.length; i++ ) {
      const sortedTranx: any = {id: 0, data: {}};
      sortedTranx.id = i + 1;
      sortedTranx.data = this.fundRequests[i];
      this.fundRequestsWithId.push(sortedTranx);
      this.isFundRequestsLoaded = false;
    }
    // console.log('************ trax with id ****************');
    // console.log(this.fundRequestsWithId);
  }


  // get all airtime transactions or by range
  getFundRequests = (newLoad = false) => {
    this.isFundRequestsLoaded = newLoad;
    this.fundRequests = [];
    this.adminService.getFundRequests().subscribe(
      response => {
        this.fundRequests = response;
        console.log('*****  FundRequests ****');
        console.log(this.fundRequests);
        this.getFundRequestsWithId();
        console.log('*****  FundRequests with id ****');
        console.log(this.fundRequestsWithId);
        this.isFundRequestsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getFundRequests, err);
        console.log(this.errorResponse);
        this.isFundRequestsLoaded = false;

      }
    );
  }

  // get user data to detect popup to display
  getUser(user, type): void {
    const data = user;
    this.fullName = data.firstName + ' ' + data.lastName;
    this.Phone = data.mobileNo;
    this.email = data.email;
    this.balance = data.balance;
    this.amount = data.amount;
    this.tellerNo = data.referenceId;
    this.date = data.paymentDate;
    this.userId = data.userId;
    this.reqId = data.id;
    this.depositorsName = data.depositorName;
    this.proofOfPayment = this.url + '/' + data.proofOfPayment;
    this.isProofAvailable = !!data.proofOfPayment;

    if (type === 'approve') {
      this.approveDialog();
    } else {
      this.declineDialog();
    }
  }

  approveDialog(): void {
    const dialogRef = this.dialog.open(ApproveFunding, {
      width: '400px',
      data: { fullName: this.fullName, phone: this.Phone, email: this.email, Balance: this.balance,
        amount: this.amount, tellerNo: this.tellerNo, date: this.date, userId: this.userId, requestId: this.reqId,
        depositorsName: this.depositorsName, proofOfPayment: this.proofOfPayment, isProofAvailable : this.isProofAvailable}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'funded') {
        this.toast.showSuccess('fund request approved successfully', 'Success');
        this.getFundRequests(true);
      } else if (result instanceof Object && result.error) {
        this.toast.showError(result.message, 'Error');
      } else {
        return;
      }
    });

  }

  declineDialog(): void {
    const dialogRef = this.dialog.open(DeclineFunding, {
      width: '400px',
      data: { fullName: this.fullName, phone: this.Phone, email: this.email, Balance: this.balance,
        amount: this.amount, tellerNo: this.tellerNo, date: this.date, userId: this.userId, requestId: this.reqId,
        depositorsName: this.depositorsName }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result === 'declined') {
        this.getFundRequests();
        this.toast.showInfo('Agent fund request has been declined', 'Info');
      } else if (result instanceof Object && result.error) {
        this.toast.showError(result.message, 'Error');
      } else {
        return;
      }
    });
  }

  ngOnInit(): void {
    this.getFundRequests(true);
  }

}


@Component({
  selector: 'approve-funding',
  templateUrl: './approve-funding.html',
  styleUrls: ['./approve-css.scss']
})
export class ApproveFunding {

  currency: string;
  private errorResponse: any;
  private isLoadingAgents: boolean;
  private transactionId: string;
  public imgSrc: any;

  // Get the data from parent component with data.{value}
  constructor(public dialogRef: MatDialogRef<ApproveFunding>,
              @Inject(MAT_DIALOG_DATA) public data: any, private errorService: ErrorService, private agentService: UserService,
              private dialog: MatDialog) {
      this.currency = 'NGN';
      console.log(data.proofOfPayment);
      this.imgSrc = data.proofOfPayment;
  }

  updateFundRequest = (callBack?: () => any) => {
    console.log(this.data.requestId);
    this.agentService.acceptFundAgent(this.data.requestId).subscribe(
      data => {
        if (callBack) {
          callBack();
        }
      },
      err => {
        console.log(err);
        this.errorResponse = this.errorService.errorHandlerWithText(this.updateFundRequest, err);
        console.log(err);
      }
    );
  }

  viewProofOfPayment(): void {
    console.log(this.data.proofOfPayment);
    const dialogRef = this.dialog.open(ViewProofOfPayment, {
      width: '500px',
      height: '600px',
      data: { proofOfPayment: this.imgSrc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  approveFund = () => {
    const paymentDetails = {userId: this.data.userId, amount: this.data.amount};
    this.agentService.fundAgent(paymentDetails).subscribe(
      data => {
        console.log(data);
        console.log('is this user funded');
        this.transactionId = data.transactionId;
        this.updateFundRequest( () => this.dialogRef.close('funded'));
      },
      err => {
        console.log(err);
        this.isLoadingAgents = false;
        this.errorResponse = this.errorService.errorHandlerWithText(this.approveFund, err);
        console.log(err);
        this.dialogRef.close(this.errorResponse);
      }
    );
  }
}



@Component({
  selector: 'decline-funding',
  template: `
    <div><h2 mat-dialog-title style="text-align: center">Fund Request</h2></div>
    <div class="mat-dialog-container">
      <div style="text-align: center; font-size: 1.1em; margin-bottom: 5px">Decline fund request of </div>
      <div style="text-align: center">
        <i>{{data.amount | currency: currency:true + ' '}}</i> from <i>{{data.fullName}}</i></div>
      <div style="text-align: center; margin-top: 40px">
        <button class="btn btn-danger" style="padding: 10px 30px; margin-right: 10px; display: inline" (click)="dialogRef.close()">
          cancel
        </button>
        <button class="btn btn-outline-primary" style="padding: 10px 30px; display: inline" (click)="declineFund()">confirm</button>
      </div>
    </div>
  `,
  styleUrls: ['./approve-css.scss']
})
export class DeclineFunding {

  public currency: string;
  private errorResponse: any;

  // Get the data from parent component with data.{value}
  constructor(public dialogRef: MatDialogRef<DeclineFunding>,
              @Inject(MAT_DIALOG_DATA) public data: any, private errorService: ErrorService, private agentService: UserService) {
      this.currency = 'NGN';

  }


  updateFundRequest = (callBack?: () => any) => {
    console.log(this.data.requestId);
    this.agentService.declineFundAgent(this.data.requestId).subscribe(
      data => {
        console.log(data);
        if (callBack) {
          callBack();
        }
      },
      err => {
        console.log(err);
        this.errorResponse = this.errorService.errorHandlerWithText(this.updateFundRequest, err);
        console.log(err);
      }
    );
  }


  declineFund = () => {
    this.updateFundRequest(() => this.dialogRef.close('declined'));
  }
}


@Component({
  selector: 'view-approve-funding',
  template: `<div style="text-align: center; vertical-align:middle;">
              <img style="width: 100%; height: 350px" [src]="data.proofOfPayment"/>
            </div>`,
  styleUrls: ['./approve-css.scss']
})
export class ViewProofOfPayment {
  private currency: string;
  public imgSrc: string;

  // Get the data from parent component with data.{value}
  constructor(public dialogRef: MatDialogRef<ViewProofOfPayment>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currency = 'NGN';
    this.imgSrc = data.proofOfPayment;
  }
}
