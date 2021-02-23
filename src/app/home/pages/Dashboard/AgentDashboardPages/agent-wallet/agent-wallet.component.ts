import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Constants} from '../../../../../shared/Constants';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {FlutterWaveResponse} from '../../../../../core/mocks/flutterwaveResponse.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

declare var window: any;

@Component({
  selector: 'app-agent-wallet',
  templateUrl: './agent-wallet.component.html',
  styleUrls: ['./agent-wallet.component.scss']
})
export class AgentWalletComponent implements OnInit {

  private pageTitle: string;

  p = 1;

  public setId = null;
  public isBlocked: boolean;
  public transactions: any;
  public isloading: boolean;
  public isLoadingTransactions: boolean;
  public errorResponse: any;
  transactionID: string;
  public userEmail: any;

  public admins: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  private range: any;
  private useRange: boolean;
  private rangeFromValue: number;
  fromDate: Date;
  toDate: Date;
  private rangeToValue: number;
  private arg: any;
  private recentTransaction = [];

  public isSuccessTicked: boolean;
  public isPendingTicked: boolean;
  public isFailedTicked: boolean;

  public fundAmount: number;
  public isFunding = false;

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;

  public rechargeObj: any = {
    amount: 0,
    fromWallet: '',
    networkId: 0,
    receiverMsisdn: '',
    networkName: ''
  };


  constructor(public userService: UserService, public anonymousService: AnonymousService, public router: Router,
              public authService: AuthService, public dialog: MatDialog, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService) {

    this.pageTitle = 'My Wallet';
    this.sharedService.emitChange(this.pageTitle);
    this.isLoadingTransactions = false;


    // this.getAllPayouts(true);
    this.range = 'today'; // default range is today

    this.transactions = [];
    this.transactionsWithId = [];
    this.isActiveTicked = true;
    this.isBlockedTicked = true;
  }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  generateTransaction = () => {

    this.isFunding = true;
    this.isloading = true;
    this.rechargeObj.amount = this.fundAmount;

    localStorage.setItem(Constants.AGENT_KEY + 'recharge', JSON.stringify(this.rechargeObj));
    this.anonymousService.generateTransactionId().subscribe(
      response => {
        // console.log('************ generateTransactionId ****************');
        // console.log(response.data[0].transactionId);
        this.transactionID = response.data[0].transactionId;
        this.payWithRave();
      },
      err => {
        // console.log(err);
        this.error.errorHandlerWithText(this.generateTransaction, err);

      }
    );
  }

  closePopup = () => {
  }

  public payWithRave(): void {
    // this.isFunding = false;

    this.isFunding = false;

    // console.log('paying');

    const ravePay = window.getpaidSetup({
      PBFPubKey: Constants.AGENT_WALLET_FUNDING_KEY,
      customer_email: this.userEmail,
      //    customer_email: Constants.SUPPORT_EMAIL,
      amount: this.rechargeObj.amount,
      customer_phone: this.rechargeObj.receiverMsisdn,
      currency: 'NGN',
      payment_method: 'both',
      txref: this.transactionID,
      meta: [{
        metaname: 'flightID',
        metavalue: 'AP1234'
      }],
      onclose(): void {
        // console.log('closed');
        // this.isFunding = false;
        // window.isFunding = false;
        // window.closePopup();
      },
      callback(response): void {
        const txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        console.log('txref ', txref);
        console.log('This is the response returned after a charge', response);
        const flutterResponse = new FlutterWaveResponse(response.data, response.name, response.success, response.tx);
        if (response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0') {
          // redirect to a success page

          const agentFundObj = {
            amount: 0,
            cardLast4Digit: '',
            paymentId: 0,
            status: '',
            transactionId: '',
            transactionRef: ''
          };

          const previousRechargeObj: any = JSON.parse(localStorage.getItem(Constants.AGENT_KEY + 'recharge'));

          agentFundObj.amount = previousRechargeObj.amount;
          agentFundObj.paymentId = flutterResponse.tx.paymentId;
          agentFundObj.transactionId = flutterResponse.tx.txRef;
          agentFundObj.status = flutterResponse.tx.status;

          const paymentObj = {
            payload: agentFundObj,
            type: 'wallet',
            homeUrl: 'agent/',
            packageTransactionUrl: '',
            repeatTransactionUrl: 'agent/wallet'
          };

          console.log('paymentObj', paymentObj);

          localStorage.setItem(Constants.AGENT_KEY + 'paymentObjKey', JSON.stringify(paymentObj));

          window.location.href = '#/agent/payment-status';

          ravePay.close();

        } else {
          // redirect to a failure page.
        }

        // this.ravePay.close(); // use this to close the modal immediately after payment.
      }
    });


  }


  ngOnInit(): void {

    this.userEmail = JSON.parse(localStorage.getItem(Constants.PROFILE)).email;

  }

  openBankDetails(): void {
    const dialogRef = this.dialog.open(BankDetailsDialogComponent, {
      height: 'auto',
      width: '400px',
      data: {}
    });
  }
}

@Component({
  selector: 'download-dialog',
  styles: [`.user-details{text-align: center} .content{width: 86%; margin: 10px auto} span{display: inline-block; height: 25px; font-weight: bold} div span:first-child{width: 140px; font-weight: normal}`],
  templateUrl: './bank-dialog.html',
})

export class BankDetailsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BankDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
