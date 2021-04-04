import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {Router} from '@angular/router';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {StorageService} from '../../../../../core/services/storage-service/storage.service';
import {UserTransactionStatistics} from '../../../../../core/mocks/userTransactionStatistics.model';
import {Constants} from '../../../../../shared/Constants';
import {User} from '../../../../../core/mocks/user/user.model';
import {UserService} from '../../../../../core/services/users-service/user-service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})

export class AgentDashboardComponent implements OnInit {
  public pageTitle: string;
  public roles: any;
  public agentDetails: any;

  public airtimeTransactions: any;
  public isTransactionsLoaded: boolean;
  public transactionsWithId: any;

  public DashboardStatistics: {
    walletBalance: number,
    walletCommissionBalance: number,
    totalTransactions: number,
    totalAirtimeTransactions: number,
    successfulAirtimeTransactions: number,
    failedAirtimeTransactions: number,
    pendingAirtimeTransactions: number,
    failedTransactions: number,
    pendingTransactions: number,
    successfulTransactions: number,
  };
  private errorResponse: any;

  constructor(public sharedService: SharedService,
              public anonymousService: AnonymousService,
              public router: Router,
              public userService: UserService,
              public error: ErrorService,
              public toast: ToastService,
              public storage: StorageService) {

    this.pageTitle = 'Dashboard';
    this.sharedService.emitChange(this.pageTitle);
    this.isTransactionsLoaded = true;
    this.transactionsWithId = [];
  }

  ngOnInit(): void {
    this.DashboardStatistics = {
      walletBalance: 0,
      walletCommissionBalance: 0,
      totalTransactions: 0,
      totalAirtimeTransactions: 0,
      successfulAirtimeTransactions: 0,
      failedAirtimeTransactions: 0,
      pendingAirtimeTransactions: 0,
      failedTransactions: 0,
      pendingTransactions: 0,
      successfulTransactions: 0,
    };
    this.getAgentDetails();
    this.getRecentTransactions();
  }

  getAgentDetails = () => {
    const agentId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    // if(JSON.parse(localStorage.getItem(Constants.PROFILE))  !==  null){
    //   return new Agent(JSON.parse(localStorage.getItem(Constants.PROFILE)).data[0]);
    // }

    // console.log('agentObj', this.storage.getProfile());

    this.anonymousService.getUser(agentId).subscribe(
      data => {
        this.getUserDashboardStatistics(agentId);
        this.agentDetails = new User(data);
        // console.log('agentDetails', this.agentDetails);
        this.DashboardStatistics.walletBalance = this.agentDetails.walletBalance;
        this.DashboardStatistics.walletCommissionBalance = this.agentDetails.walletCommissionBalance;
      });
  };

  getUserDashboardStatistics(id: number): void {
    this.anonymousService.getUserTransactionsStatistics(id).subscribe(
      data => {
        const stats = data.data[0];
        const userStatistics = new UserTransactionStatistics(stats);
        console.log(userStatistics);
        const {
          transactionCount,
          successfulTran,
          pendingTrans, failedTrans, airtimeTrans,
          successfulAirtimeTrans, failedAirtimeTrans, pendingAirtimeTrans
        } = userStatistics;
        this.DashboardStatistics = {
          ...this.DashboardStatistics,
          totalTransactions: transactionCount,
          successfulTransactions: successfulTran,
          pendingTransactions: pendingTrans,
          failedTransactions: failedTrans,
          totalAirtimeTransactions: airtimeTrans,
          successfulAirtimeTransactions: successfulAirtimeTrans,
          failedAirtimeTransactions: failedAirtimeTrans,
          pendingAirtimeTransactions: pendingAirtimeTrans,
        };
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getUserDashboardStatistics, err);
        this.toast.showError(msg.message, 'Error');
        console.log(msg);
      }
    );
  }


  // get all airtime transactions or by range
  getRecentTransactions = () => {
    this.airtimeTransactions = [];
    this.isTransactionsLoaded = true;

    const userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    this.userService.getRecentTransactions(userId, 0, 30).subscribe(
      response => {
        const transactionData = response.data[0].content.reverse();
        console.log('###', response);
        // this.airtimeTransactions = this.airtimeTransactions.filter( tranx => tranx.transactionType === Constants.AIRTIME_TRANSACTION);

        this.airtimeTransactions = transactionData.splice(0, 15);
        console.log('***** Airtime with id ****');
        this.isTransactionsLoaded = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getRecentTransactions, err);
        console.log(this.errorResponse);
        this.isTransactionsLoaded = false;

      }
    );
  }

  formatTranxType = (type) => {
    return type.split('_').join(' ');
  }


  // Re-Sort data ////////////////////
  // getTransactionsWithId(): void {
  //   this.transactionsWithId = [];
  //   for (let i = 0; i < this.airtimeTransactions.length; i++) {
  //     const sortedTranx: any = {id: 0, data: {}};
  //     sortedTranx.id = i + 1;
  //     sortedTranx.data = this.airtimeTransactions[i];
  //     this.transactionsWithId.push(sortedTranx);
  //     this.isTransactionsLoaded = false;
  //   }
  //   console.log('************ trax with id ****************');
  //   console.log(this.transactionsWithId);
  // }


}
