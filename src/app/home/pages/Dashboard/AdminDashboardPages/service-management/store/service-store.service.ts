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

  readonly serviceCategories = new BehaviorSubject<CategoryInterface[]>([]);
  private readonly _selectedCategory = new BehaviorSubject<CategoryInterface>(null);
  private readonly _catServices = new BehaviorSubject<ServiceInterface[]>([]);
  private readonly _selectedService = new BehaviorSubject<ServiceInterface>(null);
  private readonly _allServices = new BehaviorSubject<ServiceInterface[]>([]);
  private readonly _selectedServicePackage = new BehaviorSubject<ServicePackageInterface>(null);
  private readonly _servicePackages = new BehaviorSubject<ServicePackageInterface[]>([]);

  get categories(): Observable<CategoryInterface[]> {
    this.setAllServices();
    return this.serviceCategories as Observable<CategoryInterface[]>;
  }

  setAllServices(): void {
    const services = [];
    this.serviceCategories.subscribe(res => {
      res.forEach((cat) => {
        services.push(...cat.serviceResponses);
      });
      this._allServices.next(services);
    });
  }

  get allServices(): Observable<ServiceInterface[]> {
    return this._allServices as Observable<ServiceInterface[]>;
  }

  setCategories(categories): void {
    this.serviceCategories.next(categories);
  }

  setCategory(cat: CategoryInterface): void {
    this._selectedCategory.next(cat);
  }

  getCategory(id: number): CategoryInterface {
    if (this.serviceCategories.getValue().length) {
      this.setCategory(this.serviceCategories.getValue().find(c => c.id === id));
      this._catServices.next(this._selectedCategory.getValue().serviceResponses);
    }
    return this._selectedCategory.getValue();
  }

  get services(): ServiceInterface[] {
    return this._catServices.getValue();
  }

  get servicePackages(): ServicePackageInterface[] {
    return this._servicePackages.getValue();
  }

  getSelectedService(catId: number, serviceId: number): ServiceInterface {
    this._selectedService.next(this.getCategory(catId).serviceResponses.find(s => s.id === serviceId));
    this._servicePackages.next(this._selectedService.getValue().servicePackages);
    return this._selectedService.getValue();
  }

  getSelectedPackage(packageId: number): ServicePackageInterface {
    this._selectedServicePackage.next(
      this._selectedService.getValue().servicePackages.find(p => p.id === packageId));
    return this._selectedServicePackage.getValue();
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
        ...serv
      };
    }
  }

  toggleServiceActivation(id: number, status: number): void {
    const serv = this.services.find(s => s.id === id);
    if (serv) {
      const index = this.services.indexOf(serv);
      this.services[index] = {
        ...serv,
        status
      };
    }
  }
}
