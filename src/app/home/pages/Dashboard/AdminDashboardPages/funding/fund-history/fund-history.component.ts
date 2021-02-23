import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-fund-history',
  templateUrl: './fund-history.component.html',
  styleUrls: ['../../../../../../core/shared/custom-card.scss', './fund-history.component.scss']
})
export class FundHistoryComponent implements OnInit {

  errorResponse: any;
  pageTitle = 'Fund History';
  public admins: any;
  searchText: string;
  public fundTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;
  range: any;
  p = 0;
  private useRange: boolean;
  private rangeFromValue: number;
  fromDate: Date;
  toDate: Date;
  private rangeToValue: number;
  private arg: any;
  private recentTransaction = [];
  private filteredRequests = [];

  public checkboxArgs: any;

  public isSuccessTicked: boolean;
  // public isPendingTicked : boolean;
  public isFailedTicked: boolean;

  constructor(public sharedService: SharedService, public adminService: UserService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.range = 'all'; // default range is today
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    // this.isPendingTicked = true;
    this.isFailedTicked = true;
    this.getRange();
    this.getFundRequestHistory();

  }

  // Re-Sort data ////////////////////
  getFundRequestsWithId(): void {
    this.transactionsWithId = [];

    this.filteredRequests = this.fundTransactions.filter(transaction => {
      return transaction.status  !==  0;
    });
    this.filteredRequests.sort((a, b) => {
      return  a.id - b.id;
    });

    for (let i = 0; i < this.filteredRequests.length; i++ ) {
      const sortedTranx: any = {id: 0, data: {}};
      sortedTranx.id = i + 1;
      sortedTranx.data = this.filteredRequests[i];
      this.transactionsWithId.push(sortedTranx);
      this.isTransactionsLoaded = false;
    }
  }


  // get all airtime transactions or by range
  getFundRequestHistory = () => {
    this.fundTransactions = [];
    this.isTransactionsLoaded = true;
    this.adminService.getFundRequestHistory(this.arg, this.useRange).subscribe(
      response => {
        this.fundTransactions = response;
        this.getFundRequestsWithId();
        console.log('***** Fund Requests Transactions with id ****');
        console.log(this.transactionsWithId);

        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getFundRequestHistory, err);
        console.log(this.errorResponse);
        this.isTransactionsLoaded = false;
      }
    );
  }

  // get transactions by range
  getRangeTransaction(): void {
    this.rangeFromValue = new Date(this.fromDate).getTime();
    this.rangeToValue = new Date(this.toDate).getTime();
    this.arg = '?startDate=' + this.rangeFromValue + '&' + 'endDate=' + this.rangeToValue;
    this.recentTransaction = [];
    this.getFundRequestHistory();
  }

  getRange = () => {
    if ( this.range  !==  'other') {
      this.useRange = false;
      this.arg = this.range;
      this.recentTransaction = [];
      this.getFundRequestHistory();
    } else {
      this.useRange = true;
    }
    console.log(this.useRange);
  }
  ngOnInit(): void {
    this.getFundRequestHistory();

  }

}
