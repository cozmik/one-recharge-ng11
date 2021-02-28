
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {Constants} from '../../../../../shared/Constants';
import {UserTransactionStatistics} from '../../../../../core/mocks/userTransactionStatistics.model';
import {TransactionsResponse} from '../../../../../core/mocks/transactionsResponse.model';

@Component({
  selector: 'app-agent-transaction-history',
  templateUrl: './agent-transaction-history.component.html',
  styleUrls: ['./agent-transaction-history.component.scss']
})
export class AgentTransactionHistoryComponent implements OnInit {



  @Input() dUserId: number;
  @Input() self = true;

  setId: any;

  errorResponse: any;
  pageTitle: string;
  public adminsTotal: number;
  public admins: any;
  public airtimeTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  public userId: any;
  range: any;
  private useRange: boolean;
  private rangeFromValue: number;
  fromDate: Date;
  toDate: Date;
  public totalPages: number;

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

  public checkboxArgs: any;

  public isSuccessTicked: boolean;
  public isPendingTicked: boolean;
  public isFailedTicked: boolean;

  public DashboardStatistics: any = {
    walletBalance: 0,
    walletCommissionBalance: 0,
    totalTransactions : 0,
    totalAirtimeTransactions : 0,
    successfulAirtimeTransactions : 0,
    failedAirtimeTransactions : 0,
    pendingAirtimeTransactions : 0,
    failedTransactions : 0,
    pendingTransactions : 0,
    successfulTransactions : 0
  };

  ngOnInit(): void {

    if (this.self  !==  false){
      this.sharedService.emitChange(this.pageTitle);
    }

    if (this.dUserId) {
      this.userId = this.dUserId;
    }else {
      this.userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;
      this.getUserDashboardStatistics();

    }

    this.getRange();
    this.getAirtimeTransactions(this.userId);

    this.searchTerm.pipe(debounceTime(1000),
      distinctUntilChanged(), )
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(0);
      });

  }



  constructor(public sharedService: SharedService, public toast: ToastService, public dialog: MatDialog,
              public userService: UserService, public anonymousService: AnonymousService, public error: ErrorService) {
    this.pageTitle = 'My Transactions';
    this.adminsTotal = 0;
    this.range = 'today'; // default range is today
    this.itemsPerView = 10;
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    this.isPendingTicked = true;
    this.isFailedTicked = true;
  }

  getTranxData(id: any): void {
    this.setId = id;
  }

  getUserDashboardStatistics = () => {
    console.log('*** user id ***** ' + this.userId);

    this.anonymousService.getUserTransactionsStatistics(this.userId).subscribe(
      data => {
        const stats = data.data[0];
        const userStatistics = new UserTransactionStatistics(stats);
        this.DashboardStatistics.totalTransactions = userStatistics.transactionCount;
        this.DashboardStatistics.successfulTransactions = userStatistics.successfulTran;
        this.DashboardStatistics.pendingTransactions = userStatistics.pendingTrans;
        this.DashboardStatistics.failedTransactions = userStatistics.failedTrans;
        this.DashboardStatistics.totalAirtimeTransactions = userStatistics.airtimeTrans;
        this.DashboardStatistics.successfulAirtimeTransactions = userStatistics.successfulAirtimeTrans;
        this.DashboardStatistics.failedAirtimeTransactions = userStatistics.failedAirtimeTrans;
        this.DashboardStatistics.pendingTransactions = userStatistics.pendingAirtimeTrans;

        console.log('stats', this.DashboardStatistics);
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getUserDashboardStatistics, err);
        // this.toast.showError(msg.error, 'Error');
        console.log(msg);
      }
    );
  }

  getPaginatedData = (page: number) => {
    console.log('page : ' + page);
    this.page = page;
    this.userService.getAdminTransactions(this.userId,
      this.arg, this.useRange, (this.page - 1),
      this.itemsPerView, this.transactionStatus,
      0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0,
      this.isPendingTicked ? 1 : 0).subscribe(
      (response: any) => {
        console.log('response', response);
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
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
    this.airtimeTransactions = transactionData;
    console.log('####');
    console.log(this.airtimeTransactions);
  }

  // get all airtime transactions or by range
  getAirtimeTransactions = (userId) => {
    this.airtimeTransactions = [];
    this.isTransactionsLoaded = true;



    this.userService.getAdminTransactions(this.userId,
      this.arg, this.useRange,
      0, this.itemsPerView,
      this.transactionStatus,
      0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0,
      this.isPendingTicked ? 1 : 0).subscribe(
      (response: any ) => {
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
        console.log('***** Airtime Transactions with id ****');
        console.log(this.transactionsWithId);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeTransactions, err);
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
    this.getAirtimeTransactions(this.userId);
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
      this.recentTransaction = [];
      this.getAirtimeTransactions(this.userId);
    } else {
      this.useRange = true;
    }
  }




  downloadDialog(): void {
    const dialogRef = this.dialog.open(AgentReportDialogComponent, {
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
  ' overflow: hidden; text-overflow: ellipsis; text-align: center;}' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;}' +
  ' background-color:#ededed; display: inline-block;} '],
  templateUrl: './report-dialog-2.html',
})


export class AgentReportDialogComponent implements OnInit{
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


   amount: number;
   isUpdating: boolean;
   toDate: any;
   arg: string;


  constructor(
    public dialogRef: MatDialogRef<AgentReportDialogComponent>, private agentService: UserService, private error: ErrorService,
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

  getRangeTransaction(): void {
    if (this.useRange){
      this.rangeFromValue = new Date(this.fromDate).getTime();
      this.rangeToValue = new Date(this.toDate).getTime();
      this.arg = 'range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;
    }
    this.downloadReport(this.userId);
  }

  // get all airtime transactions or by range
  downloadReport = (id?: number) => {
    const userId = id ? id : this.userId;

    if (this.useRange){
      this.rangeFromValue = new Date(this.fromDate).getTime();
      this.rangeToValue = new Date(this.toDate).getTime();
      this.arg = 'range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;
    }

    console.log(this.arg);
    console.log(this.userId);
    console.log(this.useRange);

    this.isDownloading = true;
    this.adminService.getAdminTransactions(userId, this.arg,
      this.useRange, null,
      null, 2, this.download,
      this.isSuccessTicked ? 1 : 0, this.isFailedTicked ? 1 : 0, this.isPendingTicked ? 1 : 0).subscribe(
      response => {

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(response.blob());
          return;
        }

        const link = document.createElement('a');
        const data = window.URL.createObjectURL(response.blob());
        link.href = URL.createObjectURL(response.blob());
        // start download
        link.download = 'airtime-report.csv';
        link.click();
        this.isDownloading = false;
        this.dialogRef.close('success');
        setTimeout ( () => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data); }
          , 100);
      },
      err => {
        // console.log(err);
        console.log('Error Encountered');
        this.dialogRef.close();
        this.isDownloading = false;
        this.errorResponse = this.error.errorHandlerWithText(this.downloadReport(userId), err);
       // this.errorResponse = this.error.errorHandlerWithText(this.downloadReport, err);
        // console.log(this.errorResponse);
      }
    );
  }
}
