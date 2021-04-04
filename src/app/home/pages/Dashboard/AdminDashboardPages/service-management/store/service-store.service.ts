import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CategoryInterface} from '../models/service-category.model';
import {ServiceInterface} from '../models/service.model';
import {ServicePackageInterface} from '../models/service-package.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceStoreService {

  constructor() {
  }
  private readonly _serviceCategories = new BehaviorSubject<CategoryInterface[]>([]);
  private readonly _selectedCategory = new BehaviorSubject<CategoryInterface>(null);
  private readonly _catServices = new BehaviorSubject<ServiceInterface[]>([]);
  private readonly _selectedService = new BehaviorSubject<ServiceInterface>(null);
  private readonly _allServices = new BehaviorSubject<ServiceInterface[]>([]);
  private readonly _selectedServicePackage = new BehaviorSubject<ServicePackageInterface>(null);
  private readonly _servicePackages = new BehaviorSubject<ServicePackageInterface[]>([]);
  private readonly _updatedServiceList = new BehaviorSubject<number[]>([]);
  private readonly _updatedCategoryList = new BehaviorSubject<number[]>([]);

  get categories(): Observable<CategoryInterface[]> {
    return this._serviceCategories as Observable<CategoryInterface[]>;
  }

  addToUpdatedServiceList(id: number): void {
    const currentList = [...this._updatedServiceList.getValue(), id];
    this._updatedServiceList.next(currentList);
  }

  get updatedServiceList(): number[]{
    return this._updatedServiceList.getValue();
  }

  addToUpdatedCategoryList(id: number): void {
    const currentList = [...this._updatedCategoryList.getValue(), id];
    this._updatedCategoryList.next(currentList);
  }

  get updatedCategoryList(): number[]{
    return this._updatedCategoryList.getValue();
  }

  setAllServices(categories: CategoryInterface[]): void {
    const services = [];
    categories.forEach((cat) => {
      services.push(...cat.serviceResponses);
    });
    this._allServices.next(services);
  }

  get allServices(): Observable<ServiceInterface[]> {
    return this._allServices as Observable<ServiceInterface[]>;
  }

  setCategories(categories: CategoryInterface[]): void {
    this._serviceCategories.next(categories);
    this.setAllServices(categories);
  }

  setCategory(cat: CategoryInterface): void {
    this._selectedCategory.next(cat);
  }

  getCategory(id: number): CategoryInterface {
    if (this.allCategories.length) {
      this._selectedCategory.next(this.allCategories.find(c => c.id === id));
      this._catServices.next(this._selectedCategory.getValue().serviceResponses);
    }
    return this._selectedCategory.getValue();
  }

  get services(): ServiceInterface[] {
    return this._catServices.getValue();
  }

  get allCategories(): CategoryInterface[] {
    return this._serviceCategories.getValue();
  }

  get servicePackages(): ServicePackageInterface[] {
    return this._servicePackages.getValue();
  }

  getSelectedService(catId: number, serviceId: number): ServiceInterface {
    const selectServ = this.getCategory(catId).serviceResponses.find(s => s.id === serviceId);
    if (selectServ) {
      this._selectedService.next(selectServ);
      this._servicePackages.next(this._selectedService.getValue().servicePackages);
    }
    return this._selectedService.getValue();
  }

  getSelectedPackage(packageId: number): ServicePackageInterface {
    this._selectedServicePackage.next(
      this._selectedService.getValue().servicePackages.find(p => p.id === packageId));
    return this._selectedServicePackage.getValue();
  }

  updateCategory(catId: number, data): void {
    const cat = this.getCategory(catId);
    if (cat) {
      const index = this.allCategories.indexOf(cat);
      this.allCategories[index] = {
        ...cat,
        ...data
      };
    }
  }

  updateServicePackage(packageId: number, data): void {
    const pack = this.getSelectedPackage(packageId);
    if (pack) {
      const index = this.servicePackages.indexOf(pack);
      this.servicePackages[index] = {
        ...data
      };
    }
  }

  updateService(service: ServiceInterface): void {
    const serv = this.getSelectedService(service.serviceCategory.id, service.id);
    if (serv) {
      const index = this.services.indexOf(serv);
      this.services[index] = {
        ...service
      };
    } else {
      this._selectedService.next(service);
      this._allServices.next([...this._allServices.getValue(), service]);
      this.getCategory(service.serviceCategory.id).serviceResponses.push(service);
    }
  }
}
