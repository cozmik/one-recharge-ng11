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
    if (this.serviceStore.serviceCategories.getValue()){
      this.serviceStore.setCategories(this.serviceStore.serviceCategories.getValue());
      if (callBack) {
        callBack();
      }
    }
    this.http.get(this.serviceApi + 'categories', Constants.getTokenHttpHeaders()).pipe(
      map((res: any) => {
        this.serviceStore.setCategories(res);
        if (callBack) {
          callBack();
        }
      })
    ).subscribe();
  }

  toggleActivation(serviceId: number, status: boolean | number, callBack?: () => void): void {
    let action = 'activate';
    if (status) {
      action = 'deactivate';
    }
    this.http.put(`${this.serviceApi}${action}/${serviceId}`, null, Constants.getTokenHttpHeaders()).pipe(
      map((res: ServiceInterface) => {
        this.serviceStore.toggleServiceActivation(res.id, res.status);
        if (callBack) {
          callBack();
        }
      })).subscribe();
  }

  getCategoryDetails(id: number, callBack?: () => void): void {
    this.http.get(this.serviceApi + 'categories/' + id,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => {
        this.serviceStore.setCategory(res as CategoryInterface);
        if (callBack) {
          callBack();
        }
      })
    ).subscribe();
  }

  updateService(service: ServiceInterface, callBack?: () => void): void {
    this.http.put(this.serviceApi + 'update/' + service.id, service, Constants.getTokenHttpHeaders()).pipe(
      map(res => {
        this.serviceStore.updateService(res as ServiceInterface);
        if (callBack) {
          callBack();
        }
      })
    ).subscribe();
  }

  getServiceDetails(id: number, callBack?: () => void): Observable<ServiceModel> {
    if (this.selectedService.getValue() && this.selectedService.getValue().id === id) {
      return this.selectedService;
    } else {
      return this.http.get(this.serviceApi + id, Constants.getNoTokenHeaders()).pipe(
        map(res => {
          if (callBack) {
            callBack();
          }
          return new ServiceModel(res);
        })
      );
    }
  }

  updateServicePackage(servicePackageId: number,
                       packageData: { amount: number; name: string; description: string },
                       callBack?: () => void): void {
    this.http.put(this.serviceApi + '/service-package/' + servicePackageId, packageData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => {
        this.serviceStore.updateServicePackage(servicePackageId, res);
        if (callBack) {
          callBack();
        }
        // console.log(res);
      })).subscribe();
  }

  pasteServiceConfig(fromServiceId: number, toServiceId: number, callBack: () => void): void {
    const payload = {fromServiceId, toServiceId};
    this.http.post(this.serviceApi + 'copy-config', payload, {...Constants.getTokenHttpHeaders(), responseType: 'text'}).pipe(
      map(res => {
        console.log(res);
        if (callBack) {
          callBack();
        }
      })
    ).subscribe();
  }

  convertImageToBase64(file): any {
    const reader = new FileReader();
    let result = null;
    return this.http.get(file).pipe(
      map((res: any) => {
        console.log(res);
        reader.onload = (e) => {
          result = e.target.result;
        };
        reader.readAsDataURL(res);
        return result;
      })
    );
  }
}
