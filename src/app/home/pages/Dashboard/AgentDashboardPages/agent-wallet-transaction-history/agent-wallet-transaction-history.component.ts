import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Subject} from 'rxjs';
import {Constants} from '../../../../../shared/Constants';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {TransactionsResponse} from '../../../../../core/mocks/transactionsResponse.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-agent-wallet-transaction-history',
  templateUrl: './agent-wallet-transaction-history.component.html',
  styleUrls: ['./agent-wallet-transaction-history.component.scss']
})
export class AgentWalletTransactionHistoryComponent implements OnInit {

  @Input() dUserId: number;
  @Input() self = true;

  p = 1;

  public setId = null;
  public isBlocked: boolean;
  public transactions: any;
  public isloading: boolean;
  public isLoadingTransactions: boolean;
  public errorResponse: any;
  public userEmail: any;
  public userId: any;

  public admins: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  range: any;
  private useRange: boolean;
  private rangeFromValue: number;
  fromDate: Date;
  toDate: Date;
  public totalPages: number;
  public isLoadingData;
  itemsPerPage: any;
  public itemsPerView = 10;
  public transactionStatus = 2;
  public page: number;
  public status: number;
  public totalElements: number;
  public searchTerm = new Subject<string>();
  public searchText: string;
  private rangeToValue: number;
  private arg: any;
  private recentTransaction = [];

  public isSuccessTicked: boolean;
  public isPendingTicked: boolean;
  public isFailedTicked: boolean;

  public isFunding = false;

  pageTitle: string;

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;


  constructor(public userService: UserService, public anonymousService: AnonymousService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService,  public dialog: MatDialog) {
    this.isLoadingTransactions = false;

    this.pageTitle = 'Wallet';
    this.itemsPerView = 10;

    // this.getAllPayouts(true);
    this.range = 'today'; // default range is today

    this.transactions = [];
    this.transactionsWithId = [];
    this.isActiveTicked = true;
    this.isBlockedTicked = true;
  }


  getWalletTransactions = (userId = null) => {
    this.transactions = [];
    this.isTransactionsLoaded = true;

    this.userService.getAdminWalletTransactions(this.userId,
      this.arg, this.useRange, 0, this.itemsPerView,
      this.transactionStatus, 0,
      this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0).subscribe(
      (response: any ) => {
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
        console.log('***** Airtime Transactions with id ****');
        console.log(this.transactionsWithId);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getWalletTransactions, err);
        // console.log(this.errorResponse);
        this.isTransactionsLoaded = false;

      }
    );
  }


  // get transactions by range
  getRangeTransaction(): void {
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = '/range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;
    this.recentTransaction = [];
    this.getWalletTransactions();
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
      this.recentTransaction = [];
      this.getWalletTransactions();
    } else {
      this.useRange = true;
    }
  }


  ngOnInit(): void {

    if (this.self  !==  false){
      this.sharedService.emitChange(this.pageTitle);
    }

    if (this.dUserId) {
      this.userId = this.dUserId;
    }else {
      this.userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;
    }

    this.getRange();
    // console.log('**** range *****', this.range);
    // this.getWalletTransactions();
    this.searchTerm.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(0);
      });

    this.userEmail = JSON.parse(localStorage.getItem(Constants.PROFILE)).email;
  }

  getPaginatedData = (page: number) => {
    console.log('page : ' + page);
    this.page = page;
    this.userService.getAdminTransactions(this.userId,
      this.arg, this.useRange,
      (this.page - 1), this.itemsPerView,
      this.transactionStatus, 0,
      this.isSuccessTicked ? 1 : 0, this.isFailedTicked ? 1 : 0, this.isPendingTicked ? 1 : 0).subscribe(
      (response: any) => {
        console.log('response', response);
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getWalletTransactions, err);
        console.log(this.errorResponse);
        this.isTransactionsLoaded = false;
      });
  }

  processPagedData(data): void {

    console.log('data', data);

    // itemsPerPage: , currentPage: , totalItems:
    const transactionData = [];
    this.itemsPerPage = this.itemsPerView; // item per page
    this.totalPages = data.totalPages; // item per page
    this.totalElements = data.totalElements;
    this.page = data.number + 1;
    for (const tranx of data.content) {
      transactionData.push(new TransactionsResponse(tranx));
    }
    this.transactions = transactionData;
    console.log('####');
    console.log(this.transactions);
  }

  downloadDialog(): void {
    const dialogRef = this.dialog.open(AgentWalletReportDialogComponent, {
      height: '450px',
      width: '400px',
      data: {
        id : '3',
        userId : this.userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('********', result);
      if ( result === 'close') {
        return false;
      }
      else if ( result === 'success') {
        const message = 'Report download was successful' ;
        this.toast.showSuccess(message, 'Download');
      }
      else if ( result === 'failed') {
        const message = 'Report download failed' ;
        this.toast.showError(message, 'Download');
      }
    });
  }

}


@Component({
  selector: 'download-dialog',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap;' +
  ' overflow: hidden; text-overflow: ellipsis; text-align: center;} ' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;} background-color:#ededed; display: inline-block;} '],
  templateUrl: './report-dialog.html',
})


export class AgentWalletReportDialogComponent implements OnInit{
  userId: any;
  isDownloading: boolean;
  download: number;
  isPendingTicked: boolean;
  isFailedTicked: boolean;
  isSuccessTicked: boolean;
  errorResponse: any;
  rangeToValue: number;
  fromDate: any;
  rangeFromValue: number;
  useRange: boolean;
  systemCommission: any;
  networkName: any;
  agentCommission: any;
  networkId: any;
  range: any;


  public amount: number;
  public isUpdating: boolean;
  public toDate: any;
  public arg: string;


  constructor(
    public dialogRef: MatDialogRef<AgentWalletReportDialogComponent>,
    private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any, public adminService: UserService) {
    this.networkId = this.data.id;
    this.userId = this.data.userId;
    this.range = 'today';
    this.isSuccessTicked = true;
    this.isFailedTicked = true;
    this.isPendingTicked = true;
    this.download = 1;
    this.isDownloading = false;
  }

  ngOnInit(): void {
    this.getRange();
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
    } else {
      this.useRange = true;
    }
  }

  // get all airtime transactions or by range
  downloadReport = () => {

    if (this.useRange){
      this.rangeFromValue = new Date(this.fromDate).getTime();
      this.rangeToValue = new Date(this.toDate).getTime();
      this.arg = 'range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;
    }

    console.log(this.arg);
    console.log(this.userId);
    console.log(this.useRange);

    this.isDownloading = true;
    this.adminService.getAgentWalletTransactions(this.userId,
      this.arg, this.useRange, this.download,
      this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0, this.isPendingTicked ? 1 : 0).subscribe(
      response => {

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(response.blob());
          return;
        }

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
        const time = today.getHours() + ' : ' + today.getMinutes() + ':' + today.getSeconds();

        const link = document.createElement('a');
        const data = window.URL.createObjectURL(response.blob());
        link.href = URL.createObjectURL(response.blob());
        // start download
        link.download = 'wallet-report - ' + date + ' ' + time + '.csv';
        link.click();
        this.isDownloading = false;
        this.dialogRef.close('success');
        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data); }
          , 100);
      },
      err => {
        // console.log(err);
        console.log('Error Encountered');
        this.dialogRef.close('failed');
        this.isDownloading = false;
        this.errorResponse = this.error.errorHandlerWithText(this.downloadReport, err);
        // console.log(this.errorResponse);
      }
    );
  }
}

