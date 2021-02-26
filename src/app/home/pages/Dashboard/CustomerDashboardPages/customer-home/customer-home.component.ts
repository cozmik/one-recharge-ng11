import { Component, OnInit } from '@angular/core';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {ServiceManagerService} from '../../AdminDashboardPages/service-management/views/service-manager.service';

@Component({
  selector: 'app-customer-home',
  template: '<router-outlet></router-outlet>'
})
export class CustomerHomeComponent implements OnInit {

  constructor(private smStore: ServiceStoreService, private smService: ServiceManagerService) { }

  ngOnInit(): void {
    if (!this.smStore.allCategories.length){
      this.smService.getAllServicesByCategories();
    }
  }

}
