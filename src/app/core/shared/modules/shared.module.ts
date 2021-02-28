import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {ChartsModule} from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {CheckNullPipe} from '../../../shared/pipes/check-null.pipe';
import {MoneyFormatterPipe} from '../../../shared/pipes/money-formatter/money-formatter.pipe';
import {DynamicFieldComponent} from '../../../home/common-components/dynamic-field/dynamic-field.component';
import {DynamicFormComponent} from '../../../home/common-components/dynamic-form/dynamic-form.component';
import {PaymentStatusComponent} from '../../../home/common-components/payment-status/payment-status.component';
import {CreateUserComponent} from '../../../home/pages/Dashboard/AdminDashboardPages/User management/create-user/create-user.component';
import {ManageUsersComponent} from '../../../home/pages/Dashboard/AdminDashboardPages/User management/manage-agents/manage-users.component';
import {UserAgentsComponent} from '../../../home/pages/Dashboard/AdminDashboardPages/User management/user-page/user-agents/user-agents.component';
import {A2CardComponent} from '../../../home/common-components/card/card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {UserStatusFilterPipe} from '../../../shared/pipes/user-status-filter/user-status-filter.pipe';
import {FilterPipe} from '../../../shared/pipes/filter/filter.pipe';
import {CustomAlertComponent} from '../../../shared/components/custom-alert/custom-alert.component';
import {TransactionsPipe} from '../../../shared/pipes/transactions-filter/airtime-transactions.pipe';
import {TransactionStatusFilterPipe} from '../../../shared/pipes/transactions-status-filter/transaction-status-filter.pipe';

@NgModule({
  declarations: [
    CheckNullPipe,
    MoneyFormatterPipe,
    DynamicFieldComponent,
    DynamicFormComponent,
    PaymentStatusComponent,
    CreateUserComponent,
    ManageUsersComponent,
    UserAgentsComponent,
    A2CardComponent,
    UserStatusFilterPipe,
    FilterPipe,
    CustomAlertComponent,
    TransactionsPipe,
    TransactionStatusFilterPipe,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    ChartsModule,
    MatExpansionModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
  ],
  exports: [
    MatSelectModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    ChartsModule,
    MatExpansionModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CheckNullPipe,
    MoneyFormatterPipe,
    DynamicFieldComponent,
    DynamicFormComponent,
    PaymentStatusComponent,
    CreateUserComponent,
    ManageUsersComponent,
    UserAgentsComponent,
    A2CardComponent,
    UserStatusFilterPipe,
    FilterPipe,
    CustomAlertComponent,
    TransactionsPipe,
    TransactionStatusFilterPipe,
  ]
})
export class SharedModule {
}
