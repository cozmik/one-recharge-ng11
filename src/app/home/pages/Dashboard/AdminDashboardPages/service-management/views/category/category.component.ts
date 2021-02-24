import {Component, OnInit} from '@angular/core';
import {ServiceManagerService} from '../service-manager.service';
import {ActivatedRoute} from '@angular/router';
import {ServiceCategoryModel} from '../../models/service-category.model';
import {ServiceModel} from '../../models/service.model';
import {ServiceStoreService} from '../../store/service-store.service';
import {DomSanitizer} from '@angular/platform-browser';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../components/form-style.scss', './category.component.scss']
})
export class CategoryComponent implements OnInit {

  editCategory = false;
  editLogo = false;
  category: ServiceCategoryModel;
  catForm: ServiceCategoryModel;
  updatingCat: boolean;
  spinner = faSpinner;
  private fileData: FormData;

  constructor(private servService: ServiceManagerService,
              private ar: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private serviceStore: ServiceStoreService
  ) {
  }

  ngOnInit(): void {
    const id = +this.ar.snapshot.paramMap.get('id');
    // this.servService.getAllServicesByCategories();
    this.serviceStore.categories.subscribe(res => {
      if (res.length) {
        this.category = new ServiceCategoryModel(this.serviceStore.getCategory(id));
        this.catForm = new ServiceCategoryModel(this.serviceStore.getCategory(id));
      }
    });
  }

  trackFn(index, serv: ServiceModel): number {
    return serv.id;
  }

  updateCategory(): void {
    this.updatingCat = true;
    this.servService.updateCategory({categoryName: this.catForm.categoryName, description: this.catForm.description},
      this.catForm.id, () => {
        this.editCategory = false;
        this.updatingCat = false;
        this.category.categoryName = this.catForm.categoryName;
        this.category.description = this.catForm.description;
      });
  }

  getFile(e: any): void {
    const file: any = e.target.files[0];
    const data = new FormData();
    data.append('categoryLogo', file);
    this.fileData = data;
  }

  updateCatLogo(): void {
    this.updatingCat = true;
    this.servService.updateCatLogo(this.category.id, this.fileData, () => {
      this.updatingCat = false;
    });
  }

  cancelUpdate(): void {
    this.updatingCat = false;
    this.editLogo = false;
    this.editCategory = false;
  }
}
