import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {CategoryInterface, ServiceCategoryModel} from '../../AdminDashboardPages/service-management/models/service-category.model';
import {ServiceInterface, ServiceModel} from '../../AdminDashboardPages/service-management/models/service.model';
import {ServiceFormBase} from '../../../../common-components/service-form-base';
import {FormGroup} from '@angular/forms';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-perform-service',
  templateUrl: './perform-service.component.html',
  styleUrls: ['./perform-service.component.scss']
})
export class PerformServiceComponent implements OnInit {
  category: CategoryInterface;
  chosenServiceId: any;
  fields: any[];
  form: FormGroup;
  chosenService: any;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private smStore: ServiceStoreService,
    public sharedService: SharedService,
    private anonymousService: AnonymousService
  ) {
    const id = +this.ar.snapshot.paramMap.get('id');
    this.smStore.categories.subscribe(res => {
      if (res){
        this.category = this.smStore.getCategory(id);
      }
    });
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.chosenServiceId = state['serviceId'];
      this.setService();
    }
  }

  ngOnInit(): void {
  }

  setService(): void {
    const holdFields = [];
    this.chosenService = this.category.serviceResponses.find(s => s.id === this.chosenServiceId);
    this.chosenService.meta.fields.forEach(field => {
      holdFields.push(new ServiceFormBase(field));
    });
    this.fields = holdFields;
    this.form = this.sharedService.toFormGroup(this.fields);
  }

  submitServiceData(e: Event, confirm = false): void {
    const {hasConfirmation, url, confirmationUrl} = this.chosenService.meta;
    if (hasConfirmation) {
      this.anonymousService.performService(confirmationUrl, e).subscribe(res => {
        console.log(res);
      });
    }
  }
}
