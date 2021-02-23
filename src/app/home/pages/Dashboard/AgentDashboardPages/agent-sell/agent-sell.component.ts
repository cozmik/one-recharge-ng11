import { Component, OnInit } from '@angular/core';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {StorageService} from '../../../../../core/services/storage-service/storage.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {Agent} from '../../../../../core/mocks/agent/agent.model';
import {Constants} from "../../../../../shared/Constants";
import {User} from "../../../../../core/mocks/user/user.model";

@Component({
  selector: 'app-agent-sell',
  templateUrl: './agent-sell.component.html',
  styleUrls: ['./agent-sell.component.scss']
})
export class AgentSellComponent implements OnInit {

  private pageTitle: string;
  public walletAccounts : any;
  public DashboardStatistics : any = {
    'walletBalance' : null,
    'walletCommissionBalance' : null,
    'actualWalletBalance' : null
  };
  subscription: Subscription;

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public agent: UserService, public router: Router,
              public error: ErrorService, public toast: ToastService, public storage: StorageService) {

    this.pageTitle = 'Sell';
    this.sharedService.emitChange(this.pageTitle);
    // console.log('**** before subscribing ****');

    sharedService.walletAccountsEmitted$.subscribe(
      obj => {
        // console.log(obj);
        this.DashboardStatistics.walletBalance = obj.walletAccounts.walletBalance;
        this.DashboardStatistics.walletCommissionBalance = obj.walletAccounts.walletCommissionBalance;
      });
  }


  ngOnInit(): void {
    this.sharedService.emitWalletAccounts();
  }
}
