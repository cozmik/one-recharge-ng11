import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
// import {SqueezeBoxModule} from 'squeezebox';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

// A2 Components
import {NavbarComponent} from './home/pages/Dashboard/menus/top-navbar/top-navbar.component';
import {SidebarComponent} from './home/common-components/sidebar/sidebar.component';
import {LogoComponent} from './home/pages/Dashboard/logo/logo.component';
import {MainMenuComponent} from './home/pages/Dashboard/menus/main-menu/main-menu.component';
import {AlertComponent} from './home/common-components/alert/alert.component';
import {BadgeComponent} from './home/common-components/badge/badge.component';
import {BreadcrumbComponent} from './home/common-components/breadcrumb/breadcrumb.component';
import {FileComponent} from './home/common-components/file/file.component';
import {NgxPaginationModule} from 'ngx-pagination';

// Extra pages
import {FooterComponent} from './home/pages/Dashboard/footer/footer.component';
import {AdditionNavbarComponent} from './home/common-components/addition-navbar/addition-navbar.component';
import {SignInComponent} from './home/pages/sign-in/sign-in.component';
import {ForgotPasswordComponent} from './home/pages/forgot-password/forgot-password.component';
import {DashboardComponent} from './home/pages/Dashboard/dashboard.component';
import {ReportOverviewComponent} from './home/pages/Dashboard/AdminDashboardPages/report-overview/report-overview.component';
import {MailSentComponent} from './home/pages/mail-sent/mail-sent.component';
import {SideMenuComponent} from './home/pages/Dashboard/menus/main-menu/sidebar/menu-item-list.component';
import {MenuItemsComponent} from './home/pages/Dashboard/menus/main-menu/sidebar/menu-items/menu-items-setup.component';
import {SystemActivityComponent} from './home/pages/Dashboard/AdminDashboardPages/system-activity/system-activity.component';
import {
  DialogResultComponent,
  FreezeAccountComponent
} from './home/pages/Dashboard/AdminDashboardPages/User management/manage-agents/manage-users.component';
import {CreateRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/create-role/create-role.component';
import {ManageRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/manage-role/manage-role.component';
import {GeneralSettingsComponent} from './home/pages/Dashboard/AdminDashboardPages/System settings/general-settings/general-settings.component';
import {EmailContactComponent} from './home/pages/Dashboard/AdminDashboardPages/System settings/email-contact/email-contact.component';
import {PaymentComponent} from './home/pages/Dashboard/AdminDashboardPages/System settings/payment/payment.component';
import {CreateAdminComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/create-admin/create-admin.component';
import {NewPasswordComponent} from './home/pages/new-password/new-password.component';
import {EditRoleComponent} from './home/pages/Dashboard/AdminDashboardPages/Role management/edit-role/edit-role.component';
import {AdminProfileComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/admin-profile/admin-profile.component';
import {AdminChangePasswordComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/admin-change-password/admin-change-password.component';

import {CustomAlertComponent} from './shared/components/custom-alert/custom-alert.component';
// import {EmailValidator} from 'ng2-validation/dist/email';
import {AgentDialogComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/agent-account/agent-account.component';
import {MatchPasswordDirective} from './shared/directives/match-password-directive/match-password.directive';
import {ManageAdminComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/manage-admin/manage-admin.component';
import {ToastrModule} from 'ngx-toastr';
import {QuickFundingComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/quick-funding/quick-funding.component';
import {
  ApproveFunding,
  DeclineFunding,
  FundRequestsComponent,
  ViewProofOfPayment
} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-requests/fund-requests.component';
import {FundHistoryComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-history/fund-history.component';
import {
  AirtimeComponent,
  Report3DialogComponent,
  TransactionDialogComponent
} from './home/pages/Dashboard/AdminDashboardPages/Transactions/airtime/airtime.component';

// pipes
import {FilterPipe} from './shared/pipes/filter/filter.pipe';
import {Page500Component} from './home/pages/error-pages/page-500/page-500.component';
import {Page404Component} from './home/pages/error-pages/page-404/page-404.component';
import {TransactionsPipe} from './shared/pipes/transactions-filter/airtime-transactions.pipe';
import {TransactionStatusFilterPipe} from './shared/pipes/transactions-status-filter/transaction-status-filter.pipe';
import {FundRequestFilterPipe} from './shared/pipes/fund-request-filter/fund-request-filter.pipe';
import {WalletTransactionsPipe} from './shared/pipes/transactions-filter/wallet-transactions.pipe';
import {fundDialogComponent} from './home/pages/Dashboard/AdminDashboardPages/funding/fund-agents/fund-agents.component';
import {UserStatusFilterPipe} from './shared/pipes/user-status-filter/user-status-filter.pipe';
import {
  detailsDialogComponent,
  FrozenAccountsComponent
} from './home/pages/Dashboard/AdminDashboardPages/frozen-accounts/frozen-accounts.component';
import {CustomerProfileComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/customer-account/customer-account.component';
import {AdminAccountComponent} from './home/pages/Dashboard/AdminDashboardPages/User management/user-page/admin-account/admin-account.component';
import {
  NetworkDialogComponent,
  NetworksConfigurationComponent
} from './home/pages/Dashboard/AdminDashboardPages/networks-configuration/networks-configuration.component';
import {FundRequestHistoryFilterPipe} from './shared/pipes/fund-request-history/fund-request-history-filter.pipe';

import {LandingPageComponent} from './home/pages/landing-page/landing-page.component';
import {HomeComponent} from './home/pages/landing-page/home/home.component';
import {LandingPageNavbarComponent} from './home/pages/landing-page/common/landing-page-navbar/landing-page-navbar.component';
import {AgentSignUpComponent} from './home/pages/agent-sign-up/agent-sign-up.component';
import {CustomerSignUpComponent} from './home/pages/customer-sign-up/customer-sign-up.component';
import {AgentReportDialogComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-transaction-history/agent-transaction-history.component';
import {LandingPageFooterComponent} from './home/pages/landing-page/common/landing-page-footer/landing-page-footer.component';
import {ReportDialogComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-transaction-history/customer-transaction-history.component';
import {CommissionAccountsComponent} from './home/pages/Dashboard/AdminDashboardPages/audit/commission-accounts/commission-accounts.component';
import {PayoutRequestsComponent} from './home/pages/Dashboard/AdminDashboardPages/payout-requests/payout-requests.component';
import {BankDetailsDialogComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-wallet/agent-wallet.component';
import {GuestAirtimeComponent} from './home/pages/landing-page/home/guest-airtime/guest-airtime.component';
import {GuestDataComponent} from './home/pages/landing-page/home/guest-data/guest-data.component';
import {
  AgentDataHistoryComponent,
  Report2DialogComponent
} from './home/pages/Dashboard/AgentDashboardPages/agent-data-history/agent-data-history.component';
import {AgentChangePasswordComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-change-password/agent-change-password.component';
import {GuestServiceFormComponent} from './home/pages/landing-page/home/guest-service-form/guest-service-form.component';
// import {AgmCoreModule} from '@agm/core';
import {CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {Logo2Component} from './home/common-components/logo-2/logo-2.component';
import {AgentWalletReportDialogComponent} from './home/pages/Dashboard/AgentDashboardPages/agent-wallet-transaction-history/agent-wallet-transaction-history.component';
import {A2CardComponent} from './home/common-components/card/card.component';
import {PortalModule} from '@angular/cdk/portal';
import {InterceptorsProvider} from './shared/services/_helpers';
import {SharedModule} from './core/shared/modules/shared.module';
import {
  WalletComponent,
  WalletReportDialogComponent
} from './home/pages/Dashboard/AdminDashboardPages/Transactions/wallet/wallet.component';
import {CustomerHomeComponent} from './home/pages/Dashboard/CustomerDashboardPages/customer-home/customer-home.component';
import {ServiceManagerService} from './home/pages/Dashboard/AdminDashboardPages/service-management/views/service-manager.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgxDatatableModule,
    SharedModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    // }),
    // SqueezeBoxModule,
    PortalModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AdminChangePasswordComponent,
    LogoComponent,
    MainMenuComponent,
    AlertComponent,
    BadgeComponent,
    BreadcrumbComponent,
    FileComponent,
    FooterComponent,
    AdditionNavbarComponent,
    SignInComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ReportOverviewComponent,
    MailSentComponent,
    SideMenuComponent,
    MenuItemsComponent,
    SystemActivityComponent,
    Logo2Component,
    CreateRoleComponent,
    ManageRoleComponent,
    GeneralSettingsComponent,
    EmailContactComponent,
    DialogResultComponent,
    FreezeAccountComponent,
    fundDialogComponent,
    PaymentComponent,
    Report2DialogComponent,
    Report3DialogComponent,
    CreateAdminComponent,
    NewPasswordComponent,
    EditRoleComponent,
    AdminProfileComponent,
    CustomAlertComponent,
    MatchPasswordDirective,
    ManageAdminComponent,
    QuickFundingComponent,
    FilterPipe,
    Page500Component,
    Page404Component,
    AirtimeComponent,
    FundRequestsComponent,
    TransactionsPipe,
    TransactionStatusFilterPipe,
    WalletComponent,
    ApproveFunding,
    DeclineFunding,
    ViewProofOfPayment,
    FundHistoryComponent,
    FundRequestFilterPipe,
    WalletTransactionsPipe,
    UserStatusFilterPipe,
    FrozenAccountsComponent,
    detailsDialogComponent,
    NetworkDialogComponent,
    ReportDialogComponent,
    WalletReportDialogComponent,
    CustomerProfileComponent,
    AdminAccountComponent,
    NetworksConfigurationComponent,
    FundRequestHistoryFilterPipe,
    LandingPageComponent,
    HomeComponent,
    LandingPageNavbarComponent,
    AgentSignUpComponent,
    CustomerSignUpComponent,
    BankDetailsDialogComponent,
    LandingPageFooterComponent,
    CommissionAccountsComponent,
    PayoutRequestsComponent,
    GuestAirtimeComponent,
    CustomerHomeComponent,
    GuestDataComponent,
    AgentDataHistoryComponent,
    TransactionDialogComponent,
    GuestServiceFormComponent,
  ],
  entryComponents: [
    DialogResultComponent,
    ReportDialogComponent,
    Report2DialogComponent,
    Report3DialogComponent,
    AgentWalletReportDialogComponent,
    AgentReportDialogComponent,
    AgentDialogComponent,
    WalletReportDialogComponent,
    NetworkDialogComponent,
    FreezeAccountComponent,
    fundDialogComponent,
    ApproveFunding,
    DeclineFunding,
    BankDetailsDialogComponent,
    ViewProofOfPayment,
    detailsDialogComponent,
    TransactionDialogComponent,
  ],
  providers: [
    InterceptorsProvider,
  ],
  bootstrap: [AppComponent],
  exports: [
    UserStatusFilterPipe,
    FilterPipe
  ]
})

export class AppModule {
}

