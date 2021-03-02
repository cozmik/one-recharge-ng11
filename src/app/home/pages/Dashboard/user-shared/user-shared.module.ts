import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerformServiceComponent} from './perform-service/perform-service.component';
import {SharedModule} from '../../../../core/shared/modules/shared.module';
import { RecentServicesComponent } from '../../../common-components/recent-services/recent-services.component';
import {SelectPackageComponent} from './select-package/select-package.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    PerformServiceComponent,
    SelectPackageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    PerformServiceComponent,
    SelectPackageComponent
  ]
})
export class UserSharedModule { }
