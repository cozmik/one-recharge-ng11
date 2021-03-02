import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {BuyDataComponent} from './customer-dashboard/buy-data/buy-data.component';
import {PaymentStatusComponent} from '../../../common-components/payment-status/payment-status.component';
import {CustomerSettingsComponent} from './customer-settings/customer-settings.component';
import {CustomerTransactionHistoryComponent} from './customer-transaction-history/customer-transaction-history.component';
import {AuthGuard} from '../../../../core/guards/auth-guard/auth.guard';
import {ServicesComponent} from './services/services.component';
import {PerformServiceComponent} from '../user-shared/perform-service/perform-service.component';
import {RecentServicesComponent} from '../../../common-components/recent-services/recent-services.component';

const routes: Routes = [
  { path: '',
    children: [
      {
        path: '', component: CustomerDashboardComponent,
        children: [
          {path: '', component: RecentServicesComponent},
          {path: 'data', component: BuyDataComponent},
          {path: 'payment-status', component: PaymentStatusComponent},
          {path: 'services', component: ServicesComponent},
          {path: 'services/:id', component: PerformServiceComponent},
        ]
      },
      {path: '', pathMatch: 'full', component: CustomerDashboardComponent},
      {path: 'settings', component: CustomerSettingsComponent},
      {path: 'transaction-history', component: CustomerTransactionHistoryComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
