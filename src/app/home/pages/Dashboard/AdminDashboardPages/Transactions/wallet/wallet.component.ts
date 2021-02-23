
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Subject} from 'rxjs';
import {TransactionsResponse} from '../../../../../../core/mocks/transactionsResponse.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  errorResponse: any;
  pageTitle = 'Wallet Transactions';
  public adminsTotal: number;
  public admins: any;
  public airtimeTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
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
  public totalElements = 0;
  public searchTerm = new Subject<string>();
  public searchText: string;
  private rangeToValue: number;
  private arg: any;
  private recentTransaction = [];

  public checkboxArgs: any;

  public isSuccessTicked: boolean;
  // public isPendingTicked : boolean;
  public isFailedTicked: boolean;

  public dashboardData: any = {
    failedTrans: 0,
    pendingTrans: 0,
    successfulTran: 0,
    transactionCount: 0
  };


  ngOnInit(): void {
    this.getRange();
    this.getWalletStatistics();
    this.getWalletTransactions();

    this.searchTerm.pipe(debounceTime(1000),
      distinctUntilChanged(), )
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(0);
      });

  }

  constructor(public sharedService: SharedService,
              public toast: ToastService,
              public dialog: MatDialog, public adminService: UserService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.adminsTotal = 0;
    this.range = 'today'; // default range is today
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.admins = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    this.isFailedTicked = true;
    this.getRange();

  }


  // populate transactions statistics
  getWalletStatistics = () => {
    this.adminService.getStatistics().subscribe(
      response => {
        const statisticsData = response.data[0];
        console.log(statisticsData);
        this.dashboardData.transactionCount = statisticsData.walletTrans;
        // this.dashboardData.successfulTran = statisticsData.todaySuccessfulWalletTransactions;
        // this.dashboardData.pendingTrans = statisticsData.todayPendingWalletTransactions;
        // this.dashboardData.failedTrans = statisticsData.todayFailedWalletTransactions;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getWalletStatistics, err);
        console.log(this.errorResponse);

      }
    );
  }

  // get all airtime transactions or by range
  getWalletTransactions = (isloading: boolean = true) => {
    if (isloading){
      this.isTransactionsLoaded = true;
    }
    else{
      this.isTransactionsLoaded = false;
    }
    this.airtimeTransactions = [];
    this.adminService.getAdminWalletTransactions(undefined,
      this.arg, this.useRange, 0,
      this.itemsPerView, this.transactionStatus,
      0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0).subscribe(
      (response: any ) => {
        console.log('**', response);
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getWalletTransactions, err);
        console.log(this.errorResponse);
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

  getPaginatedData = (page: number) => {
    console.log('page : ' + page);
    // this.totalElements = 0;

    this.page = page;
    this.adminService.getAdminWalletTransactions(undefined,
      this.arg, this.useRange, (this.page - 1),
      this.itemsPerView, this.transactionStatus,
      0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0).subscribe(
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
    // console.log('data', data);
    // itemsPerPage: , currentPage: , totalItems:
    const transactionData = [];
    this.itemsPerPage = this.itemsPerView; // item per page
    this.totalPages = data.totalPages; // item per page
    this.totalElements = data.totalElements;
    this.page = data.number + 1;
    for (const tranx of data.content) {
      transactionData.push(new TransactionsResponse(tranx));
    }
    this.transactionsWithId = transactionData;
    console.log('####');
    console.log(this.transactionsWithId);
  }

  downloadDialog(): void{
    const dialogRef = this.dialog.open(WalletReportDialogComponent, {
      height: '450px',
      width: '400px',
      data: {
        id : '3'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('********', result);
      if ( result === 'close'){
        return false;
      }
      else if ( result === 'success'){
        const message = 'Report download was successful' ;
        this.toast.showSuccess(message, 'Download');
      }
      else if ( result === 'failed'){
        const message = 'Report download failed' ;
        this.toast.showError(message, 'Download');
      }
    });
  }

}


@Component({
  selector: 'download-dialog',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden;' +
  ' text-overflow: ellipsis; text-align: center;}' +
  '.user-details span{ color:#444; text-transform:uppercase;' +
  ' text-overflow:ellipsis}',
    '.wallet { font-weight: normal; ' +
    'padding:2px 5px; border-radius:5px;text-align: center;}' +
    ' background-color:#ededed; display: inline-block;} '],
  templateUrl: './report-dialog.html',
})
export class WalletReportDialogComponent {
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
  toDate: any;
  private arg: string;


  constructor(
    public dialogRef: MatDialogRef<WalletReportDialogComponent>, private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any, public adminService: UserService, ) {
    this.networkId = this.data.id;
    this.range = 'today';
    this.isSuccessTicked = true;
    this.isFailedTicked = true;
    this.isPendingTicked = true;
    this.download = 1;
    this.isDownloading = false;
    this.getRange();
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range + '?';
    } else {
      this.useRange = true;
    }
  }

  getRangeTransaction = () => {
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = '/range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue  + '&';
    console.log('********* using range transaction', this.arg);
    // this.downloadReport();
  }

  // get all airtime transactions or by range
  downloadReport = () => {

    if (this.useRange){
      this.getRangeTransaction();
    }

    this.isDownloading = true;
    this.adminService.getWalletTransactionsByPeriod(this.arg,
      this.download, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0,
      this.isPendingTicked ? 1 : 0).subscribe(
      response => {

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(response.blob());
          return;
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(response.blob());
        // start download
        link.download = 'wallet-report.csv';
        link.click();
        this.isDownloading = false;
        this.dialogRef.close('success');
      },
      err => {
        // console.log(err);
        this.error.errorHandlerWithText(this.downloadReport, err);
        // this.dialogRef.close('failed');
        // this.isDownloading = false;
        // this.errorResponse = this.error.errorHandlerWithText(this.downloadReport, err);
        // console.log(this.errorResponse);
      }
    );
  }
}

