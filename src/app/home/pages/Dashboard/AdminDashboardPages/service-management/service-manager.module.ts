import {NgModule, OnInit} from '@angular/core';

import {TitleComponent} from './components/title/title.component';
import {ServiceCategoriesComponent} from './views/service-categories/service-categories.component';
import {ServiceRoutingModule} from './service-routing.module';
import {RouterModule} from '@angular/router';
import {CategoryComponent} from './views/category/category.component';
import {ServiceListComponent} from './components/service-list/service-list.component';
import {QuickConfigModalComponent} from './components/modals/quick-cofig-modal/quick-config-modal.component';
import {ServiceComponent} from './views/service/service.component';
import {PercentCurrencyDirective} from './directives/percent-currency/percent-currency.directive';
import {CommissionListModalComponent} from './components/modals/commission-list-modal/commission-list-modal.component';
import {PackageViewModalComponent} from './components/modals/package-view-modal/package-view-modal.component';
import {AddTierComponent} from './components/modals/add-tier/add-tier.component';
import {ServiceSearchModalComponent} from './components/modals/service-search-modal/service-search-modal.component';
import {PortalModule} from '@angular/cdk/portal';
import {ServiceConfigSheetComponent} from './components/modals/service-config-sheet/service-config-sheet.component';
import {NotSavedWarningComponent} from './components/modals/not-saved-warning/not-saved-warning.component';
import {ServiceManagementComponent} from './service-management.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../core/shared/shared.module';
import {ServiceManagerService} from './views/service-manager.service';

@NgModule({
  declarations: [
    TitleComponent,
    ServiceCategoriesComponent,
    CategoryComponent,
    ServiceListComponent,
    QuickConfigModalComponent,
    ServiceComponent,
    PercentCurrencyDirective,
    CommissionListModalComponent,
    PackageViewModalComponent,
    AddTierComponent,
    ServiceSearchModalComponent,
    ServiceConfigSheetComponent,
    NotSavedWarningComponent,
    ServiceManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServiceRoutingModule,
    PortalModule,
    SharedModule,
  ]
})
export class ServiceManagerModule {
  constructor(private smService: ServiceManagerService) {
    this.smService.getAllServicesByCategories();
  }
}
