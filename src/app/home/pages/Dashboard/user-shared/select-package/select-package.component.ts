import { Component, OnInit } from '@angular/core';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {ServiceCategoryModel} from '../../AdminDashboardPages/service-management/models/service-category.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-select-package',
  templateUrl: './select-package.component.html',
  styleUrls: ['./select-package.component.scss']
})
export class SelectPackageComponent implements OnInit {
  categories: ServiceCategoryModel[];

  constructor(private smStore: ServiceStoreService, public sanitizer: DomSanitizer, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.smStore.categories.subscribe(res => {
      const cat: ServiceCategoryModel[] = [];
      res.forEach(category => {
        cat.push(new ServiceCategoryModel(category));
      });
      this.categories = cat;
    });
  }

}
