import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgentRoutingModule} from './agent-routing.module';

import {AgentWalletComponent} from './agent-wallet/agent-wallet.component';
import {AgentSellComponent} from './agent-sell/agent-sell.component';
import {AgentDashboardComponent} from './agent-dashboard/agent-dashboard.component';
import {SellDataComponent} from './agent-sell/sell-data/sell-data.component';
import {SellAirtimeComponent} from './agent-sell/sell-airtime/sell-airtime.component';
import {AgentProfileComponent} from './agent-profile/agent-profile.component';
import {AgentNewFundRequestComponent} from './agent-new-fund-request/agent-new-fund-request.component';
import {AgentSupportComponent} from './agent-support/agent-support.component';
import {
  AgentAccountComponent,
  AgentDialogComponent
} from '../AdminDashboardPages/User management/user-page/agent-account/agent-account.component';
import {
  AgentReportDialogComponent,
  AgentTransactionHistoryComponent
} from './agent-transaction-history/agent-transaction-history.component';
import {PermissionsComponent} from '../AdminDashboardPages/User management/user-page/permissions/permissions.component';
import {AgentFundRequestHistoryComponent} from './agent-fund-request-history/agent-fund-request-history.component';
import {AgentChangePasswordComponent} from './agent-change-password/agent-change-password.component';
import {
  AgentWalletReportDialogComponent,
  AgentWalletTransactionHistoryComponent
} from './agent-wallet-transaction-history/agent-wallet-transaction-history.component';
import {FundAgentsComponent} from '../AdminDashboardPages/funding/fund-agents/fund-agents.component';
import {SharedModule} from '../../../../core/shared/modules/shared.module';
import {UserProfileComponent} from '../AdminDashboardPages/User management/user-page/user-profile.component';
import {ServiceManagerService} from '../AdminDashboardPages/service-management/views/service-manager.service';
import {UserSharedModule} from '../user-shared/user-shared.module';


@NgModule({
  declarations: [
    AgentDashboardComponent,
    AgentSellComponent,
    SellAirtimeComponent,
    SellDataComponent,
    AgentProfileComponent,
    AgentNewFundRequestComponent,
    AgentWalletComponent,
    AgentSupportComponent,
    AgentTransactionHistoryComponent,
    FundAgentsComponent,
    AgentAccountComponent,
    PermissionsComponent,
    AgentWalletTransactionHistoryComponent,
    AgentFundRequestHistoryComponent,
    AgentWalletReportDialogComponent,
    AgentChangePasswordComponent,
    AgentDialogComponent,
    AgentReportDialogComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserSharedModule,
    AgentRoutingModule
  ]
})
export class AgentModule {
}
