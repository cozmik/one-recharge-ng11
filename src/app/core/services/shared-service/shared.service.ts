import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Constants} from '../../../shared/Constants';
import {AnonymousService} from '../anonymous-service';
import {ErrorService} from '../error_service/error.service';
import {Agent} from '../../mocks/user/agent.model';
import {ServiceFormBase} from '../../../home/common-components/service-form-base';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

export class CustomFormGroup extends FormGroup {
  fields: ServiceFormBase<string>[];

  constructor(formData: any, fields) {
    super(formData);
    this.fields = fields;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable string sources
  public emitChangeSource = new Subject();
  public emitWalletAccountsSource = new Subject<any>();
  public recentServices = new BehaviorSubject<{}>(null);
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  // Observable wallet accounts
  walletAccountsEmitted$ = this.emitWalletAccountsSource.asObservable();

  totalTicketCount: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private _userWallet: any;

  static toFormGroup(fields: ServiceFormBase<string>[]): CustomFormGroup {
    const group: any = {};
    fields.forEach(field => {
      if (!field.formFields) {
        group[field.key] = field.required ? new FormControl(field.value || '', Validators.required) :
          new FormControl(field.value || '');
      } else {
        group[field.key] = SharedService.toFormGroup(field.formFields);
      }
    });
    return new CustomFormGroup(group, fields);
  }

  get userWallet(): any {
    return this._userWallet;
  }

  set userWallet(value: any) {
    this._userWallet = value;
  }

  // Service message commands
  emitChange(change: string): any {
    this.emitChangeSource.next(change);
  }

  emitWalletAccounts = () => {
    const walletAccounts: any = {
      walletBalance: 0,
      walletCommissionBalance: 0,
      actualWalletBalance: 0
    };

    const userId = JSON.parse(localStorage.getItem(Constants.PROFILE)).id; // get user ID

    this.anonymousService.getUser(userId).subscribe(
      (data: any) => {
        const userDetails = new Agent(data);

        // console.log(this.agentDetails);
        walletAccounts.walletBalance = userDetails.walletBalance;
        walletAccounts.walletCommissionBalance = userDetails.walletCommissionBalance;
        walletAccounts.actualWalletBalance = userDetails.actualWalletBalance;
        console.log('** inner **', walletAccounts);
        this.emitWalletAccountsSource.next({walletAccounts});

      },
      err => {
        this.error.errorHandlerWithText(this.emitWalletAccounts, err);
      }
    );
  }

  constructor(public http: HttpClient,
              public anonymousService: AnonymousService,
              public error: ErrorService) {
  }

  createUser(formData: any, token: string): Observable<any> {
    return this.http.post(Constants.CREATE_ADMIN_URL, formData, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  updateUser(userFormData: any, id, token: string): Observable<any> {
    return this.http.put(Constants.UPDATE_ADMIN_URL + id, userFormData, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  checkUser(user): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + user, Constants.getTokenHttpHeaders('false', 'false')).pipe(
      map(res => res));
  }


  checkUserExist(email = '', mobileNo = ''): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + '?email=' + email + '&mobileNo=' + mobileNo, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getProfile(email): Observable<any> {
    return this.http.get(Constants.SEARCH_USER_URL + '?email=' + email, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  prettifyString(str: string): string {
    return str.replace(/_/g, ' ');
  }
}
