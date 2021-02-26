import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {Constants} from '../../../../../shared/Constants';

@Component({
  selector: 'app-agent-fund-request-history',
  templateUrl: './agent-fund-request-history.component.html',
  styleUrls: ['./agent-fund-request-history.component.scss']
})
export class AgentFundRequestHistoryComponent implements OnInit {

  errorResponse: any;
  pageTitle = 'Fund History';
  public admins: any;
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

  constructor(public sharedService: SharedService, public agent: UserService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.range = 'all'; // default range is today
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
    this.checkboxArgs = [];
    this.isSuccessTicked = true;
    // this.isPendingTicked = true;
    this.isFailedTicked = true;

  }

  // Re-Sort data ////////////////////
  getFundRequestsWithId(): void {
    this.transactionsWithId = [];



    // this.filteredRequests = this.fundTransactions.filter(transaction => {
    //   return transaction.status !== 0;
    // })

    this.filteredRequests = this.fundTransactions.sort((a, b) => {
      return  a.id - b.id;
    });

    console.log('this filteredRequests external', this.filteredRequests);



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
    const agentId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;
    this.agent.getAgentFundRequestHistory(agentId, this.arg, this.useRange).subscribe(
      (response: any) => {
        this.fundTransactions = response;
        console.log('this.fundTransactions', this.fundTransactions);
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
    this.getRange();
    this.getFundRequestHistory();
  }

}
