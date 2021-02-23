import {Component, OnInit} from '@angular/core';
import {ServiceManagerService} from '../service-manager.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryInterface, ServiceCategoryModel} from '../../models/service-category.model';
import {ServiceModel} from '../../models/service.model';
import {ServiceStoreService} from '../../store/service-store.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../components/form-style.scss', './category.component.scss']
})
export class CategoryComponent implements OnInit {

  editCategory = false;
  editLogo = false;
  category: ServiceCategoryModel;
  categoryInterface: CategoryInterface;

  constructor(private servService: ServiceManagerService,
              private ar: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private serviceStore: ServiceStoreService
  ) {
  }

  ngOnInit(): void {
    const id = +this.ar.snapshot.paramMap.get('id');
    this.servService.getAllServicesByCategories(() => {
      this.getServiceCategory(id);
    });
  }

  trackFn(index, serv: ServiceModel): number {
    return serv.id;
  }

  getServiceCategory(id: number): void {
    this.serviceStore.categories.subscribe(res => {
      if (res.length) {
        this.categoryInterface = this.serviceStore.getCategory(id);
        this.category = new ServiceCategoryModel(this.categoryInterface);
        this.servService.title.next(this.category.categoryName + ' - Services');
      }
    });
  }
}
