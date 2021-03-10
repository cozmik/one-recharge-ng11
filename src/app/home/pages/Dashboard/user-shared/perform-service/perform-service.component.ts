import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {CategoryInterface} from '../../AdminDashboardPages/service-management/models/service-category.model';
import {ServiceFormBase} from '../../../../common-components/service-form-base';
import {FormGroup} from '@angular/forms';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';

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
  servicePackage: any;
  isLoading: boolean;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private smStore: ServiceStoreService,
    public sharedService: SharedService,
    private anonymousService: AnonymousService
  ) {
    const id = +this.ar.snapshot.paramMap.get('id');
    this.isLoading = false;
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
    this.chosenService = this.category.serviceResponses.find(s => s.id === this.chosenService.id);
    this.chosenService.meta.fields.forEach(field => {
      holdFields.push(new ServiceFormBase(field));
    });
    this.fields = holdFields;
    this.form = this.sharedService.toFormGroup(this.fields);
  }

  submitServiceData(e: Event, confirm = false): void {
    this.isLoading = true;
    const {hasConfirmation, url, confirmationUrl} = this.chosenService.meta;
    const payload = {
      lat: 0,
      lga: '',
      lng: 0,
      packageId: this.servicePackage,
      state: ''
    };
    if (hasConfirmation) {
      this.anonymousService.performService(this.anonymousService.cleanUrl(confirmationUrl, 'kojeh-v2/api/'),
        this.anonymousService.cleanUrl(url, 'kojeh-v2/api/'), {...payload, ...e}).subscribe(res => {
        console.log(res);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
    }
  }
}
