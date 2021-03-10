
import {map} from 'rxjs/operators';
/**
 * Created by swifta on 1/22/18.
 */
import { Injectable } from '@angular/core';
import {Constants} from '../../shared/Constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnonymousService {

  constructor(public http: HttpClient) {
  }

  getRoles(): Observable<any> {
    return this.http.get(Constants.GET_ROLES_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getNetworks(): Observable<any> {
    return this.http.get(Constants.GET_NETWORKS_URL).pipe(map(res => res));
  }

  getDataNetworks(): Observable<any>{
    return this.http.get(Constants.GET_NETWORKS_URL + 'data-network').pipe(map(res => res));
  }

  getFundPaymentModes(): Observable<any> {
    return this.http.get(Constants.GET_FUND_PAYMENT_MODES_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  generateTransactionId(): Observable<any> {
    return this.http.get(Constants.SERVICE_URL + '/transactions/generate-transaction-id',
      Constants.getTokenHttpHeaders() ).pipe(map(res => res));
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
    return this.http.get(Constants.USERS_TRANSACTIONS_URL + userId + '?pageSize=10' , Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUserTransactionsStatistics(userId: number): Observable<any> {
    return this.http.get(Constants.USERS_TRANSACTIONS_STATISTICS_URL + userId, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getServices(): Observable<any> {
    return this.http.get(Constants.SERVICE_URL + '/services/categories', Constants.getNoTokenHeaders()).pipe(
      map(res => res));
  }

  performService(confirmUrl: string, payUrl: string, data: any, authenticated = true): Observable<any> {
    console.log(Constants.SERVICE_URL + confirmUrl);
    console.log(payUrl);
    return this.http.post(Constants.SERVICE_URL + confirmUrl,
      data, authenticated ? Constants.getTokenHttpHeaders('false') : Constants.getNoTokenHeaders('false')).pipe(
      map(res => res));
  }

  cleanUrl(str: string, stringToRemove: string): string {
    if (str.includes(stringToRemove)){
      return str.replace(stringToRemove, '');
    } else {
      return str;
    }
  }
}
