import {map} from 'rxjs/operators';
/**
 * Created by swifta on 1/22/18.
 */
import {Injectable} from '@angular/core';
import {Constants} from '../../shared/Constants';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceInterface, ServiceModel} from '../../home/pages/Dashboard/AdminDashboardPages/service-management/models/service.model';
import {CategoryInterface} from '../../home/pages/Dashboard/AdminDashboardPages/service-management/models/service-category.model';

@Injectable({
  providedIn: 'root'
})
export class AnonymousService {
  public static guestFreqServices = new BehaviorSubject<Map<any, any>>(new Map());
  public static userFreqServices = new BehaviorSubject<Map<any, any>>(new Map());
  private readonly loggedInUserId;
  dynamicFormCategory = new BehaviorSubject<{ category?: CategoryInterface }>(null);
  dynamicFormService = new BehaviorSubject<{ service?: ServiceInterface }>(null);
  userDynamicFormService = new BehaviorSubject<{ service?: ServiceInterface }>(null);

  constructor(public http: HttpClient) {
    this.loggedInUserId = JSON.parse(localStorage.getItem(Constants.PROFILE))?.id;
    if (localStorage.getItem('guest_freq_services')) {
      AnonymousService.guestFreqServices.next(new Map(JSON.parse(localStorage.getItem('guest_freq_services'))));
    }
    if (localStorage.getItem(`user_freq_services_${this.loggedInUserId}`)) {
      AnonymousService.userFreqServices.next(new Map(JSON.parse(localStorage.getItem(`user_freq_services_${this.loggedInUserId}`))));
    }
  }

  storeFreqService(service: ServiceModel, userType: string): string {
    const frqServ = AnonymousService[userType].getValue();
    if (frqServ.has(service)) {
      frqServ.set(service, frqServ.get(service) + 1);
    } else {
      frqServ.set(service, 1);
    }
    AnonymousService[userType].next(frqServ);
    return JSON.stringify([...frqServ]);
  }

  addFreqService(service: ServiceModel, userId?: number): void {
    let userType = '';
    if (userId) {
      userType = 'userFreqServices';
      localStorage.setItem(`user_freq_services_${this.loggedInUserId}`, this.storeFreqService(service, userType));
    } else {
      userType = 'guestFreqServices';
      localStorage.setItem('guest_freq_services', this.storeFreqService(service, userType));
    }
  }

  getRoles(): Observable<any> {
    return this.http.get(Constants.GET_ROLES_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getNetworks(): Observable<any> {
    return this.http.get(Constants.GET_NETWORKS_URL).pipe(map(res => res));
  }

  getDataNetworks(): Observable<any> {
    return this.http.get(Constants.GET_NETWORKS_URL + 'data-network').pipe(map(res => res));
  }

  getFundPaymentModes(): Observable<any> {
    return this.http.get(Constants.GET_FUND_PAYMENT_MODES_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  generateTransactionId(): Observable<any> {
    return this.http.get(Constants.SERVICE_URL + '/transactions/generate-transaction-id',
      Constants.getTokenHttpHeaders()).pipe(map(res => res));
  }

  getPermissions(): Observable<any> {
    return this.http.get(Constants.GET_PERMISSIONS_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getRole(id): Observable<any> {
    return this.http.get(Constants.GET_ROLES_URL + id, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  deleteRole(id: any): Observable<any> {
    return this.http.delete(Constants.DELETE_ROLES_URL + id, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(Constants.USERS_URL + userId, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getAgentNetworksConfig(userId: number): Observable<any> {
    return this.http.get(Constants.USERS_NETWORK_URL + userId, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUserTransactions(userId: number): Observable<any> {
    return this.http.get(Constants.USERS_TRANSACTIONS_URL + userId + '?pageSize=10', Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUserTransactionsStatistics(userId: number): Observable<any> {
    return this.http.get(Constants.USERS_TRANSACTIONS_STATISTICS_URL + userId, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  performService(mainUrl, data: any): Observable<any> {
    console.log(data);
    return this.http.post(Constants.SERVICE_URL + '/' + mainUrl,
      data, Constants.getNoTokenHeaders('false')).pipe(
      map(res => res));
  }

  cleanUrl(str: string, stringToRemove: string): string {
    if (str.includes(stringToRemove)) {
      return str.replace(stringToRemove, '');
    } else {
      return str;
    }
  }
}
