import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {CategoryInterface} from '../../AdminDashboardPages/service-management/models/service-category.model';
import {ServiceFormBase} from '../../../../common-components/service-form-base';
import {CustomFormGroup, SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../../../common-components/confirm-modal/confirm-modal.component';
import {ToastrService} from 'ngx-toastr';
import {Constants} from '../../../../../shared/Constants';
import {ServiceInterface} from '../../AdminDashboardPages/service-management/models/service.model';
import {Subscription} from 'rxjs';
import {ServiceManagerService} from '../../AdminDashboardPages/service-management/views/service-manager.service';

@Component({
  selector: 'app-perform-service',
  templateUrl: './perform-service.component.html',
  styleUrls: ['./perform-service.component.scss']
})
export class PerformServiceComponent implements OnInit, OnDestroy {
  category: CategoryInterface;
  chosenServiceId: any;
  fields: any[];
  form: CustomFormGroup;
  chosenService: any;
  servicePackage: any;
  isLoading: boolean;
  private userData: any;
  private $serviceHolderSub: Subscription;
  private serviceId: number;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private smStore: ServiceStoreService,
    public sharedService: SharedService,
    private anonymousService: AnonymousService,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private location: Location,
    private smService: ServiceManagerService
  ) {
  }

  ngOnInit(): void {
    const id = +this.ar.snapshot.paramMap.get('id');
    this.serviceId = +this.ar.snapshot.paramMap.get('serviceId');
    this.userData = JSON.parse(localStorage.getItem(Constants.PROFILE));
    this.isLoading = false;
    this.getCategoryDetails(id, (response) => {
      this.category = response;
      // this.category = this.smStore.getCategory(id);
      if (this.serviceId) {
        this.getServiceDetails(this.serviceId);
      }
    });
    this.$serviceHolderSub = this.anonymousService.userDynamicFormService.subscribe(ser => {
      if (ser && this.category) {
        this.chosenService = this.category.serviceResponses.find(s => s.id === ser.service.id);
      }
      // this.setService();
    });
  }

  getCategoryDetails(id, callback: (res) => void): void {
    this.smService.getCategoryDetails(id, callback);
  }

  getServiceDetails(id): void {
    this.smService.getServiceDetails(id, (res: ServiceInterface) => {
      this.chosenService = res;
      this.anonymousService.dynamicFormService.next({service: res});
      this.anonymousService.dynamicFormCategory.next({category: res.serviceCategory});
      this.setService();
    });
  }

  setService(): void {
    const holdFields = [];
    if (!this.serviceId) {
      const url = this.router.createUrlTree([this.chosenService.id], {relativeTo: this.ar}).toString();
      this.location.go(url);
    }
    this.chosenService = this.category.serviceResponses.find(s => s.id === this.chosenService.id);
    this.anonymousService.userDynamicFormService.next(this.chosenService);
    this.chosenService.meta.fields.forEach(field => {
      holdFields.push(new ServiceFormBase(field));
    });
    this.fields = holdFields;
    this.form = SharedService.toFormGroup(this.fields);
  }

  submitServiceData(e: any, confirm = false): void {
    this.isLoading = true;
    let mainUrl = '';
    const {url, confirmationUrl} = this.chosenService.meta;
    let hasConfirmation: boolean;
    if (e.hasConfirmation === undefined) {
      hasConfirmation = this.chosenService.meta.hasConfirmation;
    } else {
      hasConfirmation = e.hasConfirmation;
    }
    const payload = {
      lat: 0,
      lga: '',
      lng: 0,
      packageId: this.servicePackage.id,
      state: ''
    };
    if (hasConfirmation) {
      mainUrl = this.anonymousService.cleanUrl(confirmationUrl, 'kojeh-v2/api/');
    } else {
      mainUrl = this.anonymousService.cleanUrl(url, 'kojeh-v2/api/');
    }
    this.anonymousService.performService(mainUrl, {...payload, ...e}).subscribe(res => {
      if (hasConfirmation) {
        this.confirmPayment({...payload, ...e}, res.message, 'Confirm Payment');
      } else {
        this.toaster.success('Transaction was successful', 'Success');
        if (this.userData.userType.toLowerCase() !== 'agent') {
          this.anonymousService.addFreqService(this.chosenService.id, this.userData.id);
        }
        this.isLoading = false;
        this.form.reset();
      }
    }, error => {
      this.isLoading = false;
    });
  }

  confirmPayment(data: any, message: string, title: string): void {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: {message, title},
    }).afterClosed().subscribe(res => {
      if (res) {
        this.submitServiceData({...data, hasConfirmation: false});
      }
    });
  }

  selectService(service: ServiceInterface): void {
    this.anonymousService.userDynamicFormService.next({service});
  }

  ngOnDestroy(): void {
    this.anonymousService.userDynamicFormService.next(null);
    this.$serviceHolderSub.unsubscribe();
  }
}
