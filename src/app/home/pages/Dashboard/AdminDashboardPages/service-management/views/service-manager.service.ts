import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CategoryInterface, ServiceCategoryModel} from '../models/service-category.model';
import {map} from 'rxjs/operators';
import {ServiceInterface, ServiceModel} from '../models/service.model';
import {ServiceStoreService} from '../store/service-store.service';
import {Constants} from '../../../../../../shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService {

  serviceApi = Constants.SERVICE_URL + '/services/';
  selectedService = new BehaviorSubject<ServiceModel>(null);
  selectedCategory = new BehaviorSubject<ServiceCategoryModel>(null);
  startLoading = new BehaviorSubject<boolean>(false);
  title = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, public serviceStore: ServiceStoreService) {
  }

  getAllServicesByCategories(callBack?: () => void): void {
    if (this.serviceStore.allCategories){
      this.serviceStore.setCategories(this.serviceStore.allCategories);
      if (callBack) {
        callBack();
      }
    }
    this.http.get(this.serviceApi + 'categories', Constants.getTokenHttpHeaders()).subscribe(
      (res: any) => {
        this.serviceStore.setCategories(res);
        if (callBack) {
          callBack();
        }
      }
    );
  }

  toggleActivation(serviceId: number, status: boolean | number, callBack?: () => void): void {
    let action = 'activate';
    if (status) {
      action = 'deactivate';
    }
    this.http.put(`${this.serviceApi}${action}/${serviceId}`, null, Constants.getTokenHttpHeaders()).subscribe(
      (res: ServiceInterface) => {
        this.serviceStore.updateService(res);
        if (callBack) {
          callBack();
        }
      }
    );
  }

  getCategoryDetails(id: number, callBack?: () => void): void {
    this.http.get(this.serviceApi + 'categories/' + id,
      Constants.getTokenHttpHeaders()).subscribe(
      res => {
        this.serviceStore.setCategory(res as CategoryInterface);
        if (callBack) {
          callBack();
        }
      });
  }

  updateService(service: ServiceInterface, callBack?: () => void): void {
    const data = {
      ...service,
      categoryId: service.serviceCategory.id
    };
    this.http.put(this.serviceApi + 'update/' + service.id, data, Constants.getTokenHttpHeaders())
    .subscribe(res => {
        this.serviceStore.updateService(res as ServiceInterface);
        if (callBack) {
          callBack();
        }
      });
  }

  // getServiceDetails(id: number, callBack?: () => void): Observable<ServiceModel> {
  //   if (this.selectedService.getValue() && this.selectedService.getValue().id === id) {
  //     return this.selectedService;
  //   } else {
  //     return this.http.get(this.serviceApi + id, Constants.getNoTokenHeaders()).pipe(
  //       map(res => {
  //         if (callBack) {
  //           callBack();
  //         }
  //         return new ServiceModel(res);
  //       })
  //     );
  //   }
  // }

  updateServicePackage(servicePackageId: number,
                       packageData: { amount: number; name: string; description: string },
                       callBack?: () => void): void {
    this.http.put(this.serviceApi + '/service-package/' + servicePackageId, packageData,
      Constants.getTokenHttpHeaders()).subscribe(
      res => {
        this.serviceStore.updateServicePackage(servicePackageId, res);
        if (callBack) {
          callBack();
        }
      }
    );
  }

  pasteServiceConfig(fromServiceId: number, toServiceId: number, callBack: () => void): void {
    const payload = {fromServiceId, toServiceId};
    this.http.post(this.serviceApi + 'copy-config', payload, {...Constants.getTokenHttpHeaders(), responseType: 'text'})
    .subscribe(
      res => {
        if (callBack) {
          callBack();
        }
      }
    );
  }

  updateCategory(categoryData: {categoryName: string, description: string}, catId: number, callback: () => void): void {
    this.http.put(this.serviceApi + 'category/' + catId, categoryData,
      {...Constants.getTokenHttpHeaders(), responseType: 'text'}).subscribe(
      res => {
        this.serviceStore.updateCategory(catId, categoryData);
        if (callback) {
          callback();
        }
      }
    );
  }

  updateCatLogo(catId: number, fileData: FormData, callback?: () => void): void {
    this.http.put(this.serviceApi + 'category/upload-image/' + catId, fileData, Constants.getTokenHttpHeaders()).pipe(
      map(res => {
        console.log(res);
      })
    ).subscribe();
  }
}
