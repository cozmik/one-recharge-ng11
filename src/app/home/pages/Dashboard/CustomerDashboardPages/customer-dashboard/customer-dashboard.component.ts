import { Component, OnInit } from '@angular/core';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {Router} from '@angular/router';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {StorageService} from '../../../../../core/services/storage-service/storage.service';
import {Customer} from '../../../../../core/mocks/customer/customer.model';
import {UserTransactionStatistics} from '../../../../../core/mocks/userTransactionStatistics.model';
import {Constants} from '../../../../../shared/Constants';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {TransactionsResponse} from '../../../../../core/mocks/transactionsResponse.model';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  public pageTitle: string;
  public roles: any;
  public customerDetails: any;
  public transactionsWithId: any;
  public airtimeTransactions: any;
  public isTransactionsLoaded: boolean;

  public DashboardStatistics: any = {
    walletBalance : 0,
    walletCommissionBalance : 0,
    totalTransactions : 0,
    totalAirtimeTransactions : 0,
    successfulAirtimeTransactions : 0,
    failedAirtimeTransactions : 0,
    pendingAirtimeTransactions : 0,
    failedTransactions : 0,
    pendingTransactions : 0,
    successfulTransactions : 0
  };

  constructor(public anonymousService: AnonymousService, public router: Router, public userService: UserService,
              public error: ErrorService, public toast: ToastService, public storage: StorageService) {
    this.transactionsWithId = [];
    this.getAirtimeTransactions();
    this.isTransactionsLoaded = true;
    this.getAirtimeTransactions();

  }

  ngOnInit(): void {
    this.getCustomerDetails();
    this.getAirtimeTransactions();
  }


  editRole(id): void {
    this.router.navigate(['admin/edit-role/', id ]);
  }

  getCustomerDetails = () => {
    const customerId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    this.anonymousService.getUser(customerId).subscribe(
      data => {
        this.getUserDashboardStatistics(customerId);
        this.customerDetails = new Customer(data);
        console.log('customerDetails', this.customerDetails);
        this.DashboardStatistics.walletBalance = this.customerDetails.walletBalance;
        this.DashboardStatistics.walletCommissionBalance = this.customerDetails.walletCommissionBalance;
        console.log('DashboardStatistics', this.DashboardStatistics);
      },
      err => {
        console.log(err);
        this.error.errorHandlerWithText(this.getCustomerDetails, err);
        // this.toast.showError(msg.message, 'Error');
        // console.log(msg);
      }
    );
  }

  getUserDashboardStatistics = (id: number) => {
    this.anonymousService.getUserTransactionsStatistics(id).subscribe(
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
        this.error.errorHandlerWithText(this.getUserDashboardStatistics, err);
        // this.toast.showError(msg.message, 'Error');
        // console.log(msg);
      }
    );
  }

  // Re-Sort data ////////////////////
  getTransactionsWithId = () => {
    this.transactionsWithId = [];
    for (let i = 0; i < this.airtimeTransactions.length; i++ ) {
      const sortedTranx: any = {id: 0, data: {}};
      sortedTranx.id = i + 1;
      sortedTranx.data = this.airtimeTransactions[i];
      this.transactionsWithId.push(sortedTranx);
      this.isTransactionsLoaded = false;
    }
    console.log('************ trax with id ****************');
    console.log(this.transactionsWithId);
  }

  getTransactionType = (val) => {
    const newVal = val.split('_')[0];
    return newVal;
  }

  // get all airtime transactions or by range
  getAirtimeTransactions = () => {
    this.isTransactionsLoaded = true;

    const userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id;

    this.userService.getTransactionsByUser(userId).subscribe(
      response => {
        this.airtimeTransactions = [];
        const transactionResponse = response.data[0].content;
        const transactionHolder = [];

        transactionResponse.forEach((tranx) => {
          const dTranx = new TransactionsResponse(tranx);
          transactionHolder.push(dTranx);
          this.airtimeTransactions = transactionHolder
            .slice(0, transactionHolder.length > 5 ? 5 : transactionHolder.length); // limit most recent tranx to 5
        });


        console.log('***** Airtime Transactions ****');
        console.log(this.airtimeTransactions);
        this.isTransactionsLoaded = false;
        this.getTransactionsWithId();
        console.log('***** Airtime Transactions with id ****');
        console.log(this.transactionsWithId);

      },
      err => {
        console.log(err);
        const errorResponse = this.error.errorHandlerWithText(this.getAirtimeTransactions, err);
        console.log(errorResponse);
        this.isTransactionsLoaded = false;

      }
    );
  }



}
