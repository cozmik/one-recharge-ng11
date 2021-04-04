import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgentDashboardComponent} from './agent-dashboard/agent-dashboard.component';
import {AgentSellComponent} from './agent-sell/agent-sell.component';
import {SelectPackageComponent} from '../user-shared/select-package/select-package.component';
import {SellAirtimeComponent} from './agent-sell/sell-airtime/sell-airtime.component';
import {SellDataComponent} from './agent-sell/sell-data/sell-data.component';
import {AgentProfileComponent} from './agent-profile/agent-profile.component';
import {AgentWalletComponent} from './agent-wallet/agent-wallet.component';
import {CreateUserComponent} from '../AdminDashboardPages/User management/create-user/create-user.component';
import {ManageUsersComponent} from '../AdminDashboardPages/User management/manage-agents/manage-users.component';
import {PaymentStatusComponent} from '../../../common-components/payment-status/payment-status.component';
import {AgentNewFundRequestComponent} from './agent-new-fund-request/agent-new-fund-request.component';
import {AgentSupportComponent} from './agent-support/agent-support.component';
import {AgentTransactionHistoryComponent} from './agent-transaction-history/agent-transaction-history.component';
import {UserProfileComponent} from '../AdminDashboardPages/User management/user-page/user-profile.component';
import {AgentAccountComponent} from '../AdminDashboardPages/User management/user-page/agent-account/agent-account.component';
import {UserAgentsComponent} from '../AdminDashboardPages/User management/user-page/user-agents/user-agents.component';
import {PermissionsComponent} from '../AdminDashboardPages/User management/user-page/permissions/permissions.component';
import {AgentFundRequestHistoryComponent} from './agent-fund-request-history/agent-fund-request-history.component';
import {AgentChangePasswordComponent} from './agent-change-password/agent-change-password.component';
import {PerformServiceComponent} from '../user-shared/perform-service/perform-service.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/agent/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: AgentDashboardComponent},
  {
    path: 'sell', component: AgentSellComponent,
    children: [
      {path: '', component: SelectPackageComponent},
      {path: ':id', component: PerformServiceComponent},
      {path: ':id/:serviceId', component: PerformServiceComponent},
      {path: 'airtime', component: SellAirtimeComponent},
      {path: 'data', component: SellDataComponent}]
  },
  {path: 'profile', component: AgentProfileComponent},
  {path: 'wallet', component: AgentWalletComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'manage-user', component: ManageUsersComponent},
  {path: 'payment-status', component: PaymentStatusComponent},
  {path: 'new-fund-request', component: AgentNewFundRequestComponent},
  {path: 'support', component: AgentSupportComponent},
  {path: 'transaction-history', component: AgentTransactionHistoryComponent},
  {
    path: 'user/:id', component: UserProfileComponent,
    children: [
      {path: 'account', component: AgentAccountComponent},
      {path: 'user-agents', component: UserAgentsComponent},
      {path: 'permissions', component: PermissionsComponent}]
  },
  // { path: 'data-transaction-history', component: AgentDataHistoryComponent},
  {path: 'fund-request-history', component: AgentFundRequestHistoryComponent},
  {path: 'change-password', component: AgentChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
