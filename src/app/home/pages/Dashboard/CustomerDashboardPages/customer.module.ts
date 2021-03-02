import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {BuyAirtimeComponent} from './customer-dashboard/buy-airtime/buy-airtime.component';
import {BuyDataComponent} from './customer-dashboard/buy-data/buy-data.component';
import {CustomerSettingsComponent} from './customer-settings/customer-settings.component';
import {CustomerTransactionHistoryComponent} from './customer-transaction-history/customer-transaction-history.component';
import {SharedModule} from '../../../../core/shared/modules/shared.module';
import {ServicesComponent} from './services/services.component';
import {ServiceManagerService} from '../AdminDashboardPages/service-management/views/service-manager.service';
import {ManageCustomersComponent} from '../AdminDashboardPages/User management/manage-customers/manage-customers.component';
import {UserSharedModule} from '../user-shared/user-shared.module';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BuyAirtimeComponent,
    BuyDataComponent,
    CustomerSettingsComponent,
    CustomerTransactionHistoryComponent,
    ServicesComponent,
    ManageCustomersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserSharedModule,
    CustomerRoutingModule,
  ]
})
export class CustomerModule {
}
