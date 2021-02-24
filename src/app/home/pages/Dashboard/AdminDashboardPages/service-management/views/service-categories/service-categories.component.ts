import { Component, OnInit } from '@angular/core';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {ServiceManagerService} from '../service-manager.service';
import {ServiceCategoryModel} from '../../models/service-category.model';
import {ServiceStoreService} from '../../store/service-store.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {

  serviceCategories: ServiceCategoryModel[];
  arrow = faArrowRight;
  plus = faPlus;

  constructor(private servService: ServiceManagerService, public sanitizer: DomSanitizer, private serviceStore: ServiceStoreService) {
    setTimeout(() => {
      this.servService.title.next('Categories');
    }, 500);
  }

  ngOnInit(): void {
    this.serviceStore.categories.subscribe(res => {
       if (res.length > 0) {
         this.serviceCategories = res.map(cat => new ServiceCategoryModel(cat));
       }
     });
  }
}
