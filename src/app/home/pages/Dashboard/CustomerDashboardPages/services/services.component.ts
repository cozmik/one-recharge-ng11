import {Component, OnInit} from '@angular/core';
import {ServiceManagerService} from '../../AdminDashboardPages/service-management/views/service-manager.service';
import {ServiceStoreService} from '../../AdminDashboardPages/service-management/store/service-store.service';
import {ServiceCategoryModel} from '../../AdminDashboardPages/service-management/models/service-category.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  categories: ServiceCategoryModel[];

  constructor(
    private smService: ServiceManagerService,
    private smStore: ServiceStoreService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.smStore.categories.subscribe(res => {
      const cat: ServiceCategoryModel[] = [];
      res.forEach(category => {
        cat.push(new ServiceCategoryModel(category));
      });
      this.categories = cat;
    });
  }

  gotoServicePage(id: number): void {
    this.router.navigate(['customer/services/' + id]);
  }
}
