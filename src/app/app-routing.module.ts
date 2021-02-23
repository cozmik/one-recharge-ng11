import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {ForgotPasswordComponent} from './home/pages/forgot-password/forgot-password.component';
import {SignInComponent} from './home/pages/sign-in/sign-in.component';
import {DashboardComponent} from './home/pages/Dashboard/dashboard.component';
import {ReportOverviewComponent} from './home/pages/Dashboard/AdminDashboardPages/report-overview/report-overview.component';
import {MailSentComponent} from './home/pages/mail-sent/mail-sent.component';
import {CreateUserComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/create-user/create-user.component';
import {ManageUsersComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/manage-agents/manage-users.component';
import {CreateAdminComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/create-admin/create-admin.component';
import {NewPasswordComponent} from './home/pages/new-password/new-password.component';
import {CreateRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/create-role/create-role.component';
import {ManageRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/manage-role/manage-role.component';
import {EditRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/edit-role/edit-role.component';
import {AdminProfileComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/admin-profile/admin-profile.component';
import {AdminChangePasswordComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/admin-change-password/admin-change-password.component';
import {UserProfileComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/user-profile.component';
import {UserAgentsComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/user-agents/user-agents.component';
import {AgentAccountComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/agent-account/agent-account.component';
import {ManageAdminComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/manage-admin/manage-admin.component';
import {PermissionsComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/permissions/permissions.component';
import {ManageCustomersComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/manage-customers/manage-customers.component';
import {QuickFundingComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/quick-funding/quick-funding.component';
import {FundRequestsComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-requests/fund-requests.component';
import {FundHistoryComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-history/fund-history.component';
import {AirtimeComponent} from './home/pages/Dashboard/AdminDashboardPages/Transactions/airtime/airtime.component';
import {WalletComponent} from './home/pages/Dashboard/AdminDashboardPages/transactions/wallet/wallet.component';
import {Page500Component} from './home/pages/error-pages/page-500/page-500.component';
import {Page404Component} from './home/pages/error-pages/page-404/page-404.component';
import {AuthGuard} from './core/guards/auth-guard/auth.guard';
import {FundAgentsComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-agents/fund-agents.component';
import {CustomerProfileComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/customer-account/customer-account.component';
import {AdminAccountComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/admin-account/admin-account.component';
import {NetworksConfigurationComponent} from './home/pages/Dashboard/AdminDashboardPages/networks-configuration/networks-configuration.component';
import {HomeComponent} from './home/pages/landing-page/home/home.component';
import {LandingPageComponent} from './home/pages/landing-page/landing-page.component';
import {AgentSignUpComponent} from './home/pages/agent-sign-up/agent-sign-up.component';
import {AgentDashboardComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-dashboard/agent-dashboard.component';
import {AgentSellComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-sell/agent-sell.component';
import {CustomerSignUpComponent} from './home/pages/customer-sign-up/customer-sign-up.component';
import {SellAirtimeComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-sell/sell-airtime/sell-airtime.component';
import {SelectPackageComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-sell/select-package/select-package.component';
import {SellDataComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-sell/sell-data/sell-data.component';
import {AgentNewFundRequestComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-new-fund-request/agent-new-fund-request.component';
import {AgentFundRequestHistoryComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-fund-request-history/agent-fund-request-history.component';
import {AgentSupportComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-support/agent-support.component';
import {AgentTransactionHistoryComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-transaction-history/agent-transaction-history.component';
import {CustomerDashboardComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-dashboard/customer-dashboard.component';
import {CustomerHomeComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-home/customer-home.component';
import {CustomerSettingsComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-settings/customer-settings.component';
import {CustomerTransactionHistoryComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-transaction-history/customer-transaction-history.component';
import {CommissionAccountsComponent} from './home/pages/Dashboard/AdminDashboardPages/audit/commission-accounts/commission-accounts.component';
import {PayoutRequestsComponent} from './home/pages/Dashboard/AdminDashboardPages/payout-requests/payout-requests.component';
import {BuyAirtimeComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-dashboard/buy-airtime/buy-airtime.component';
import {BuyDataComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-dashboard/buy-data/buy-data.component';
import {PaymentStatusComponent} from './home/common-components/payment-status/payment-status.component';
import {AgentWalletComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-wallet/agent-wallet.component';
import {GuestAirtimeComponent} from './home/pages/landing-page/home/guest-airtime/guest-airtime.component';
import {AgentGuard} from './core/guards/agent-auth-guard/agent.guard';
import {AgentProfileComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-profile/agent-profile.component';
import {GuestDataComponent} from './home/pages/landing-page/home/guest-data/guest-data.component';
import {AgentChangePasswordComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-change-password/agent-change-password.component';
import {FrozenAccountsComponent} from './home/pages/Dashboard/AdminDashboardPages/frozen-accounts/frozen-accounts.component';
import {AdminGuard} from './core/guards/admin-auth-guard/admin.guard';

const admin: Routes = [
  {
    path: '',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', component: ReportOverviewComponent},
  {path: 'reset-password', component: ForgotPasswordComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'create-admin', component: CreateAdminComponent},
  {path: 'manage-admin', component: ManageAdminComponent},
  {path: 'manage-user', component: ManageUsersComponent},
  {path: 'manage-customers', component: ManageCustomersComponent},
  {path: 'manage-networks', component: NetworksConfigurationComponent},
  {path: 'frozen-accounts', component: FrozenAccountsComponent},
  {path: 'transactions', component: AirtimeComponent},
  {path: 'wallet-transactions', component: WalletComponent},
  {path: 'commission-accounts', component: CommissionAccountsComponent},
  {path: 'payout-requests', component: PayoutRequestsComponent},
  {path: 'create-role', component: CreateRoleComponent},
  {path: 'manage-role', component: ManageRoleComponent},
  {path: 'fund-agents', component: FundAgentsComponent},
  {path: 'manage-services',
    loadChildren: () => import('./home/pages/Dashboard/AdminDashboardPages/service-management/service-manager.module').
    then(m => m.ServiceManagerModule)
  },
  {path: 'quick-funding', component: QuickFundingComponent},
  {path: 'fund-requests', component: FundRequestsComponent},
  {path: 'fund-history', component: FundHistoryComponent},
  {path: 'edit-role/:id', component: EditRoleComponent},
  {path: 'profile', component: AdminProfileComponent},
  {path: 'change-password', component: AdminChangePasswordComponent},
  {
    path: 'profile/:id', component: UserProfileComponent,
    children: [
      {path: 'view', component: AdminAccountComponent},
      {path: 'permissions', component: PermissionsComponent}]
  },
  {
    path: 'agent/:id', component: UserProfileComponent,
    children: [
      {path: 'account', component: AgentAccountComponent},
      {path: 'user-agents', component: UserAgentsComponent},
      {path: 'permissions', component: PermissionsComponent}]
  },
  {
    path: 'customer/:id', component: UserProfileComponent,
    children: [
      {path: 'account', component: CustomerProfileComponent},
    ]
  }
  // { path: '**', component: PageNotFoundComponent },
];


const agent: Routes = [
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
  {path: 'change-password', component: AgentChangePasswordComponent}];


const error: Routes = [
  {path: 'page-404', component: Page404Component},
  {path: 'page-500', component: Page500Component},
];

const landingPage: Routes = [
  {
    path: '', component: HomeComponent,
    pathMatch: 'full',
    children: [
      {path: '', pathMatch: 'full', component: GuestAirtimeComponent},
      {path: 'airtime', component: GuestAirtimeComponent},
      {path: 'data', component: GuestDataComponent},
      {path: 'payment-status', component: PaymentStatusComponent}
    ]
  },
  {
    path: 'customer', component: CustomerHomeComponent,
    children: [
      {
        path: '', pathMatch: 'full', component: CustomerDashboardComponent,
        children: [
          {path: '', component: SelectPackageComponent},
          {path: 'airtime', component: BuyAirtimeComponent},
          {path: 'data', component: BuyDataComponent},
          {path: 'payment-status', component: PaymentStatusComponent}
        ]
      },
      {path: '', pathMatch: 'full', component: CustomerDashboardComponent},
      {path: 'settings', component: CustomerSettingsComponent},
      {path: 'transaction-history', component: CustomerTransactionHistoryComponent}
    ],
    canActivate: [AuthGuard]
  }
];


/////////////////////////////////////// Base routes ///////////////////////////////////////////////////////////////////
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/admin/dashboard',
  //   pathMatch: 'full'
  // },
  {path: 'page-500', component: Page500Component, },
  {path: 'page-404', component: Page404Component, },
  {
    path: 'admin',
    component: DashboardComponent,
    children: admin,
    canActivate: [AdminGuard]
  },
  {
    path: 'agent',
    component: DashboardComponent,
    children: agent,
    canActivate: [AgentGuard]
  },
  {
    path: '',
    component: LandingPageComponent,
    children: landingPage,
  },

  {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: landingPage,
  },


  // {
  //   path: '',
  //   component: SignInComponent,
  // },

  {
    path: 'sign-in',
    component: SignInComponent,
  },

  {
    path: 'sign-up',
    component: CustomerSignUpComponent,
  },

  {
    path: 'agent-signup',
    component: AgentSignUpComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'new-password/:token',
    component: NewPasswordComponent,
  },

  {
    path: 'mail-sent',
    component: MailSentComponent
  },

  // {
  //   path: 'error',
  //   component: ExtraLayoutComponent,
  // },
  // {
  //   path: '**',
  //   component: Page404Component,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
