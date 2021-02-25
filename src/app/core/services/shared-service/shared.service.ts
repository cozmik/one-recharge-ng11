
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject , BehaviorSubject, Observable} from 'rxjs';
import {Constants} from '../../../shared/Constants';
import {AnonymousService} from '../anonymous-service';
import {ErrorService} from '../error_service/error.service';
import {Agent} from "../../mocks/user/agent.model";
import {ServiceFormBase} from "../../../home/common-components/service-form-base";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable string sources
  public emitChangeSource = new Subject();
  public emitWalletAccountsSource = new Subject<any>();

  totalTicketCount: BehaviorSubject<number> = new BehaviorSubject<number>(10);

  private _userWallet: any;


  get userWallet(): any {
    return this._userWallet;
  }

  set userWallet(value: any) {
    this._userWallet = value;
  }

  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  // Observable wallet accounts
  walletAccountsEmitted$ = this.emitWalletAccountsSource.asObservable();


  // Service message commands
  emitChange(change: string) {
    this.emitChangeSource.next(change);
  }

  emitWalletAccounts = () => {
    const walletAccounts: any = {
      'walletBalance' : 0,
      'walletCommissionBalance' : 0,
      'actualWalletBalance' : 0
    }

    const userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id; // get user ID


    this.anonymousService.getUser(userId).subscribe(
      (data: any) => {
        const userData = data.data[0];
        const userDetails = new Agent(userData);

        // console.log(this.agentDetails);
        walletAccounts.walletBalance = userDetails.walletBalance;
        walletAccounts.walletCommissionBalance = userDetails.walletCommissionBalance;
        walletAccounts.actualWalletBalance = userDetails.actualWalletBalance;
        console.log('** inner **', walletAccounts);
        this.emitWalletAccountsSource.next({ walletAccounts });

      },
      err => {
        this.error.errorHandlerWithText(this.emitWalletAccounts, err);
      }
    );
  }

  constructor(public http: HttpClient,  public anonymousService: AnonymousService,  public error: ErrorService) {
  }

  /**
   * create user
   * @param formData
   * @param token
   */
  createUser(formData: any, token: string): Observable<any> {
    return this.http.post(Constants.CREATE_ADMIN_URL, formData, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  updateUser(userFormData: any, id, token: string): Observable<any> {
    return this.http.put(Constants.UPDATE_ADMIN_URL + id, userFormData, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  checkUser(user): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + user, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  checkUserExist(email= '', mobileNo= ''): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + '?email=' + email + '&mobileNo=' + mobileNo, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getProfile(email): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + '?email=' + email, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  toFormGroup(fields: ServiceFormBase<string>[] ): FormGroup {
    const group: any = {};
    fields.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  prettifyString(str: string): string {
    return str.replace(/_/g, ' ');
  }
}
