
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Subject, Timestamp} from 'rxjs';
import {TransactionsResponse} from '../../../../../../core/mocks/transactionsResponse.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-airtime-transactions',
  templateUrl: './airtime.component.html',
  styleUrls: ['./airtime.component.scss']
})
export class AirtimeComponent implements OnInit {
  itemsPerPage: any;
  setId: any;

  errorResponse: any;
  pageTitle = 'Airtime & Data';
  public adminsTotal: number;
  public admins: any;
  public airtimeTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  public transactions: TransactionsResponse[];
  range: any;
  private useRange: boolean;
  private rangeFromValue: number;
   fromDate: Date;
   toDate: Date;
  public totalPages: number;
  public isLoadingData;
  tranxOwner: any;
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
  private totalSuccessfulTranx: number;
  private totalFailedTranx: number;

  public checkboxArgs: any;

  public isSuccessTicked: boolean;
  public isPendingTicked: boolean;
  public isFailedTicked: boolean;

  public dashboardData: any = {
    failedTrans: 0,
    pendingTrans: 0,
    successfulTran: 0,
    transactionCount: 0
  };

  ngOnInit(): void {
    this.getRange();
    this.getAirtimeStatistics();
    this.getAirtimeTransactions();

    this.searchTerm.pipe(debounceTime(1000),
      distinctUntilChanged(), )
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
      });
  }

  constructor(public sharedService: SharedService, public toast: ToastService, public dialog: MatDialog,
              public adminService: UserService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.adminsTotal = 0;
    this.totalSuccessfulTranx = 0;
    this.totalFailedTranx = 0;
    this.itemsPerView = 10;
    this.range = 'today'; // default range is today
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    this.isPendingTicked = true;
    this.isFailedTicked = true;
  }

  getTranxData(transaction): void{
    this.setId = transaction.transactionId;
    this.tranxOwner = transaction.fromType;
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }

  getPaginatedData = (page: number) => {
    console.log('page : ' + page);
    this.page = page;
    this.isTransactionsLoaded = true;
    this.adminService.getAdminTransactions(undefined,
      this.arg, this.useRange, (this.page - 1), this.itemsPerView,
      this.transactionStatus, 0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0, this.isPendingTicked ? 1 : 0).subscribe(
      (response: any) => {
        console.log('response', response);
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeTransactions, err);
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

  getTransactionType = (val) => {
    const newVal = val.split('_')[0];
    return newVal;
  }

  retryTransaction = () => {
    this.adminService.retryTransaction(this.setId).subscribe(
      response => {
        console.log('retry was successful');
        this.getAirtimeTransactions(true);
        this.toast.showSuccess('Transaction was completed successfully', 'Success');
        // this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.retryTransaction, err);
        this.toast.showError(this.errorResponse.message, 'Error');
        console.log(this.errorResponse);
        // this.isTransactionsLoaded = false;
      }
    );
  }

  refundTransaction = () => {
    this.adminService.refundTransaction(this.setId).subscribe(
      response => {
        console.log('reversed successfully');
        this.getAirtimeTransactions(true);
        this.toast.showSuccess('Transaction was reversed successfully', 'Success');
        // this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.refundTransaction, err);
        this.toast.showError(this.errorResponse.message, 'Error');
        console.log(this.errorResponse);
        // this.isTransactionsLoaded = false;
      }
    );
  }

  updateToSuccess = () => {
    this.adminService.updateTransactionToSuccess(this.setId).subscribe(
      response => {
        console.log('updated to success successfully');
        this.getAirtimeTransactions(true);
        this.toast.showSuccess('Transaction was updated successfully', 'Success');

        // this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.updateToSuccess, err);
        this.toast.showError(this.errorResponse.message, 'Error');
        console.log(this.errorResponse);
        // this.isTransactionsLoaded = false;
      }
    );
  }

  // populate transactions statistics
  getAirtimeStatistics = () => {
    this.adminService.getStatistics().subscribe(
      response => {
        const statisticsData = response.data[0];
        console.log(statisticsData);
        this.dashboardData = statisticsData;
        // this.dashboardData.successfulTran = statisticsData.todaySuccessfulAirtimeTransactions;
        // this.dashboardData.pendingTrans = statisticsData.todayPendingAirtimeTransactions;
        // this.dashboardData.failedTrans = statisticsData.todayFailedAirtimeTransactions;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeStatistics, err);
        console.log(this.errorResponse);

      }
    );
  }

  // get all airtime transactions or by range
  getAirtimeTransactions = (isloading: boolean = true) => {
    this.isTransactionsLoaded = isloading;
    this.transactions = [];
    this.adminService.getAdminTransactions(undefined,
      this.arg, this.useRange, 0, this.itemsPerView,
      2, 0, this.isSuccessTicked ? 1 : 0,
      this.isFailedTicked ? 1 : 0,
      this.isPendingTicked ? 1 : 0).subscribe(
      (response: any ) => {
        console.log('**', response);
        this.processPagedData(response.data[0]);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeTransactions, err);
        console.log(this.errorResponse);
        this.isTransactionsLoaded = false;

      }
    );
  }

  // get transactions by range
  getRangeTransaction = () => {
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = 'range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;
    this.recentTransaction = [];
    this.getAirtimeTransactions(true);
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
      this.recentTransaction = [];
      this.getAirtimeTransactions();
    } else {
      this.useRange = true;
    }
  }

  downloadDialog(): void{
    const dialogRef = this.dialog.open(Report3DialogComponent, {
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



  viewTransaction(tranxObj: any): void {

    console.log('tranxObj', new TransactionsResponse(tranxObj));

    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        tranxObj: new TransactionsResponse(tranxObj)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close'){
        return false;
      }
    });
  }

}


@Component({
  selector: 'download-dialog',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' +
  ' text-align: center;} .user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis} ' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;background-color:#ededed;' +
  ' display: inline-block;} '],
  templateUrl: './report-dialog.html',
})
export class Report3DialogComponent {
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
    public dialogRef: MatDialogRef<Report3DialogComponent>, private agentService: UserService, private error: ErrorService,
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
    console.log(this.range);

    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range + '?';
    } else {
      this.useRange = true;
    }
  }

  getRangeTransaction = () => {  // transactions/today?download=1&downloadSuccessful=1&downloadFailed=1&downloadPending=1
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = 'range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue + '&';
    console.log('********* using range transaction', this.arg);
    // this.downloadReport();
    //
  }

  // get all airtime transactions or by range
  downloadReport = () => {
    if (this.useRange){
      this.getRangeTransaction();
    }

    this.isDownloading = true;
    this.adminService.getAirtimeTransactions(undefined,
      this.arg, this.useRange, this.download,
      this.isSuccessTicked ? 1 : 0,
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
        const data = window.URL.createObjectURL(response.blob());
        link.href = URL.createObjectURL(response.blob());
        document.body.appendChild(link);
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
        this.error.errorHandlerWithText(this.downloadReport, err);
      }
    );
  }
}





@Component({
  selector: 'dialog-result',
  styles: [ `.user-details {
    text-decoration: none;
    list-style: none;
    color: #444;
  }

  .user-details tr {
    margin: 10px 0;
  }

  .user-details tr:nth-child(even) {
    background-color: #ecf0f5;
  }

  .user-details tr td:nth-child(1) {
    color: #444;
    font-weight: 400;
    width: 40%;
  }

  .detail {
    font-weight: 700;
    margin-top: 8px;
    width: 60%;
  }

  .title {
    font-weight: 400;
    margin-top: 8px;
    width: 40%;
    text-overflow: ellipsis;
  } `],
  templateUrl: './view-transaction-details.html',
})

export class TransactionDialogComponent {

  amount: number;
  channel: string;
  commission: number;
  createdDate: Timestamp<number>;
  description: string;
  email: string;
  fromType: string;
  network: number;
  retries: number;
  status: number;
  toMsisdn: string;
  transactionId: string;
  transactionType: string;


  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('recieved data obj :', this.data);
    this.transactionId = this.data.tranxObj.transactionId;
    this.email = this.data.tranxObj.email;
    this.transactionType = this.data.tranxObj.transactionType;
    this.channel = this.data.tranxObj.channel;
    this.network = this.data.tranxObj.networkName;
    this.retries = this.data.tranxObj.retries;
    this.toMsisdn = this.data.tranxObj.toMsisdn;
    this.amount = this.data.tranxObj.amount;
    this.commission = this.data.tranxObj.commission;
    this.fromType = this.data.tranxObj.fromType;
    this.description = this.data.tranxObj.description;
    this.createdDate = this.data.tranxObj.createdDate;
    this.status = this.data.tranxObj.status;
  }

  getTransactionType = (val) => {
    const newVal = val.split('_')[0];
    return newVal;
  }
}
