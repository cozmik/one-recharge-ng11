import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {Constants} from '../../../../../shared/Constants';
import {UserTransactionStatistics} from '../../../../../core/mocks/userTransactionStatistics.model';

@Component({
  selector: 'app-agent-data-history',
  templateUrl: './agent-data-history.component.html',
  styleUrls: ['./agent-data-history.component.scss']
})
export class AgentDataHistoryComponent implements OnInit {

  setId: any;

  errorResponse: any;
  searchText: string;
  pageTitle = 'Data Transactions';
  public adminsTotal: number;
  public admins: any;
  public dataTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  range: any;
  private useRange: boolean;
  private rangeFromValue: number;
  fromDate: Date;
  toDate: Date;
  private rangeToValue: number;
  private arg: any;
  private recentTransaction = [];

  public checkboxArgs: any;

  public isSuccessTicked: boolean;
  public isPendingTicked: boolean;
  public isFailedTicked: boolean;

  public DashboardStatistics: any;
  isloading: boolean;

  constructor(public sharedService: SharedService, public toast: ToastService, public dialog: MatDialog,
              public userService: UserService, public anonymousService: AnonymousService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.adminsTotal = 0;
    this.range = 'today'; // default range is today
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    this.isPendingTicked = true;
    this.isFailedTicked = true;
    this.getRange();
    this.getDataTransactions();

  }

  getTranxData(id: any): void {
    this.setId = id;
  }


  // Re-Sort data ////////////////////
  getTransactionsWithId(): void {
    this.transactionsWithId = [];
    for (let i = 0; i < this.dataTransactions.length; i++ ) {
      const sortedTranx: any = {id: 0, data: {}};
      sortedTranx.id = i + 1;
      sortedTranx.data = this.dataTransactions[i];
      this.transactionsWithId.push(sortedTranx);
      this.isTransactionsLoaded = false;
    }
    console.log('************ trax with id ****************');
    console.log(this.transactionsWithId);
  }

  getUserDashboardStatistics = () => {

    const agentId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    this.anonymousService.getUserTransactionsStatistics(agentId).subscribe(
      data => {
        const stats = data.data[0];
        this.DashboardStatistics  = new UserTransactionStatistics(stats);

        console.log('****** statistics data ********');
        console.log(this.DashboardStatistics);
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getUserDashboardStatistics, err);
        this.toast.showError(msg.message, 'Error');
        console.log(msg);
      }
    );
  }

  // get all data transactions or by range
  getDataTransactions = () => {
    this.dataTransactions = [];
    this.isTransactionsLoaded = true;

    const userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    this.userService.getAgentTransactions(userId, this.arg, this.useRange).subscribe(
      response => {
        const dataTransactions = response.data;
        this.dataTransactions = dataTransactions.filter( tranx => tranx.transactionType === Constants.DATA_TRANSACTION);
        console.log('***** Data Transactions ****');
        console.log(this.dataTransactions);
        this.getTransactionsWithId();
        console.log('***** Data Transactions with id ****');
        console.log(this.transactionsWithId);
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getDataTransactions, err);
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
    this.getDataTransactions();
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
      this.recentTransaction = [];
      this.getDataTransactions();
    } else {
      this.useRange = true;
    }
  }


  ngOnInit(): void {
    this.getUserDashboardStatistics();
    this.getDataTransactions();

  }

  downloadDialog(): void {
    const dialogRef = this.dialog.open(Report2DialogComponent, {
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
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;}' +
  ' background-color:#ededed; display: inline-block;} '],
  templateUrl: './report-dialog.html',
})
export class Report2DialogComponent {
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
    public dialogRef: MatDialogRef<Report2DialogComponent>,
    private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminService: UserService, ) {
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
      this.arg = this.range;
    } else {
      this.useRange = true;
    }
  }

  getRangeTransaction(): void {
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = '/range?startDateTimestamp=' + this.rangeFromValue + '&' + 'endDateTimestamp=' + this.rangeToValue;

    this.downloadReport();
  }

  // get all data transactions or by range
  downloadReport = () => {

    this.isDownloading = true;
    this.adminService.getAirtimeTransactions(undefined,
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

        const link = document.createElement('a');
        const data = window.URL.createObjectURL(response.blob());
        link.href = URL.createObjectURL(response.blob());
        // start download
        link.download = 'data-report.csv';
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
        this.dialogRef.close('failed');
        this.isDownloading = false;
        this.errorResponse = this.error.errorHandlerWithText(this.downloadReport, err);
        // console.log(this.errorResponse);
      }
    );
  }
}
