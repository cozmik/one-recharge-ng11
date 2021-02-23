/**
 * Created by swifta on 1/19/18.
 */
import {HttpHeaders} from '@angular/common/http';
import {Options} from 'ts-node';


export class Constants {

  public static readonly VENDOR = 'LillyNaija';
  public static readonly VENDOR_PREFIX = 'Lilly_';
  public static readonly VERSION = '2.3.0-1';

  // Dev / Test
 //   public static readonly SERVICE_URL = 'https://137.74.50.58/onerecharge/api';

  // UAT service url
 // public static readonly SERVICE_URL = 'https://test.mfisa.com/onerecharge-kojeh/api';
 public static readonly SERVICE_URL = 'http://137.74.50.58:9191/kojeh-v2/api';

  // Production URl
//  public static readonly SERVICE_URL = "https://www.lillynaija.com/onerecharge-kojeh/api";

  // https://test.mfisa.com/onerecharge/api'; //https://137.74.50.58/onerecharge/api/swagger-ui.html#/

  // Master service url
  // public static readonly SERVICE_URL = 'https://onerecharge.com/onerecharge/api';

/*
  public static readonly CUSTOMER_GUEST_PAYMENT_KEY = 'FLWPUBK-8f0d39e158fe60f0d2be40c16f288afa-X'; // test
  public static readonly AGENT_WALLET_FUNDING_KEY = 'FLWPUBK-8f0d39e158fe60f0d2be40c16f288afa-X'; // test*/


  public static readonly CUSTOMER_GUEST_PAYMENT_KEY = 'FLWPUBK-a7c603154c663338a64375881abb9193-X';

  public static readonly AGENT_WALLET_FUNDING_KEY = 'FLWPUBK-06ba917e37358e8e299bdd684252fb74-X';


  public static readonly SUPPORT_EMAIL = 'support@lillynaija.com';

  public static readonly LOGIN_URL = Constants.SERVICE_URL + '/login';
  public static readonly PROFILE_URL = Constants.SERVICE_URL + '/admins/profile';
  public static readonly AGENT_PROFILE_URL = Constants.SERVICE_URL + '/agents/profile';

  public static readonly CREATE_ADMIN_URL = Constants.SERVICE_URL + '/admins/create';
  static UPDATE_ADMIN_URL = Constants.SERVICE_URL + '/admins/update/';

  public static readonly PROFILE =  Constants.VENDOR_PREFIX + 'profile';
  public static readonly ACCESS_TOKEN = Constants.VENDOR_PREFIX + 'access_token';
  public static readonly REFRESH_TOKEN = Constants.VENDOR_PREFIX + 'refresh_token';
  public static TOKEN =  Constants.VENDOR_PREFIX + 'token';

  static ADMIN_DASHBOARD = '/admin/dashboard';
  static AGENT_DASHBOARD = '/agent';
  static CUSTOMER_DASHBOARD = '/customer';
  static GET_ROLES_URL: string = Constants.SERVICE_URL + '/roles/';
  static GET_NETWORKS_URL: string = Constants.SERVICE_URL + '/networks/';
  static GET_FUND_PAYMENT_MODES_URL: string = Constants.SERVICE_URL + '/wallet/fund-payment-modes/';
  static GENERATE_TRANSACTION_ID_URL: string = Constants.SERVICE_URL + '/generate-transaction-id';
  static EMPTY = '';
  static SIGNIN_URL: any = '/sign-in';
  static COUNTRY_URL: string = Constants.SERVICE_URL + '/countries';
  static USER_CREATED_SUCCESSFULLY: any = 'User created successfully';
  static USER_UPDATED_SUCCESSFULLY: any = 'Update successful';
  static RESET_PASSWORD_URL: string = Constants.SERVICE_URL + '/password/reset';
  static MAIL_SENT = '/mail-sent';
  static CREATE_PASSWORD_URL: string = Constants.SERVICE_URL + '/password/create';
  static CREATE_ROLES_URL: string = Constants.SERVICE_URL + '/roles/create';
  static GET_PERMISSIONS_URL = Constants.SERVICE_URL + '/permissions/';
  static USER_PERMISSIONS_URL = Constants.SERVICE_URL + '/users/permission/';
  static UPDATE_ROLES_URL = Constants.SERVICE_URL + '/roles/update/';
  static DELETE_ROLES_URL = Constants.SERVICE_URL + '/roles/delete/';
  static CREATE_AGENT_URL: string = Constants.SERVICE_URL + '/agents/create?';
  static CREATE_CUSTOMER_URL: string = Constants.SERVICE_URL + '/customers/create';
  static CREATE_AGENT_SELF_URL: string = Constants.SERVICE_URL + '/agents/agent-create-self?';
  static AGENT_URL: string = Constants.SERVICE_URL + '/agents/';
  static ADMIN_URL: string = Constants.SERVICE_URL + '/admins/';
  static USERS_URL: string = Constants.SERVICE_URL + '/users/';
  static ACTIVATION_URL: string = Constants.SERVICE_URL + '/admins/activation-mail/';
  static USERS_NETWORK_URL: string = Constants.SERVICE_URL + '/networks/user-network-config/';
  static USERS_NETWORK_CONFIG: string = Constants.SERVICE_URL + '/networks/new-agent-config/';
  static NETWORKS_URL: string = Constants.SERVICE_URL + '/networks/';
  static USERS_TRANSACTIONS_URL = Constants.SERVICE_URL + '/reports/transactions/';
  static USERS_WALLET_TRANSACTIONS_URL = Constants.SERVICE_URL + '/reports/wallet-transactions';
  static WALLET_TRANSACTIONS_URL = Constants.SERVICE_URL + '/reports/wallet-transactions';
  static USERS_TRANSACTIONS_STATISTICS_URL = Constants.SERVICE_URL + '/reports/dashboard/transaction-statistic/';


  static CUSTOMER_URL: string = Constants.SERVICE_URL + '/customers/';
  static GUEST_URL: string = Constants.SERVICE_URL + '/guest/';
  static NETWORK_URL: string = Constants.SERVICE_URL + '/networks/';
  static PAYOUTS_URL: string = Constants.SERVICE_URL + '/payouts';
  static BLOCK = '/block';
  static UNBLOCK = '/unblock';
  static DELETE = '/delete';
  static FREEZE_ACCOUNT_URL: string = Constants.SERVICE_URL + '/agents/account/freeze';
  static ADMIN_UPDATE_URL: string = Constants.SERVICE_URL + '/admins/update/';
  static MANAGE_FUND_REQUEST_URL = Constants.SERVICE_URL + '/wallet/fund-request';
  static FUND_REQUESTS_HISTORY = Constants.SERVICE_URL + '/wallet/fund-requests';
  static FUND_REQUESTS_RANGE = Constants.SERVICE_URL + '/wallet/fund-requests-range';
  static FUND_AGENT = Constants.SERVICE_URL + '/wallet/fund';
  static FREEZE_ACCOUNT = Constants.AGENT_URL + '/account/freeze';
  static AGENTS_RECHARGE = Constants.AGENT_URL + 'recharge';
  static AGENTS_BUY_DATA = Constants.AGENT_URL + 'buy-data';
  static CUSTOMER_RECHARGE = Constants.CUSTOMER_URL + 'recharge';
  static CUSTOMER_BUY_DATA = Constants.CUSTOMER_URL + 'buy-data';
  static GUEST_RECHARGE = Constants.GUEST_URL + 'recharge';
  static GUEST_BUY_DATA = Constants.GUEST_URL + 'buy-data';
  static AGENTS_SELF_FUND = Constants.CUSTOMER_URL + 'self-fund';
  static REQUEST_FUNDING = Constants.SERVICE_URL + '/wallet/request-fund?';
  static REQUEST_PAYOUT = Constants.SERVICE_URL + '/payouts/request-new?';
  static ADMIN_STATISTICS_URL: string = Constants.SERVICE_URL + '/reports/dashboard/user-statistic';
  static CHART_REPORT_STATISTICS_URL: string = Constants.SERVICE_URL + '/reports/dashboard/report-statistics';
  static ADMIN_WALLET_URL: string = Constants.SERVICE_URL + '/reports/wallet-transactions';
  static WALLET_URL: string = Constants.SERVICE_URL + '/wallet';
  static AIRTIME_TRANSACTIONS: string = Constants.SERVICE_URL + '/reports/transactions';
  static TRANSACTIONS: string = Constants.SERVICE_URL + '/transactions';
  static FUND_REQUESTS: string = Constants.SERVICE_URL + '/wallet/fund-requests';
  static COMMISSION_ACCOUNTS: string = Constants.SERVICE_URL + '/accounts';

  static AGENT_FUND_REQUESTS = Constants.SERVICE_URL + '/wallet/agent-fund-requests';
  static AGENT_FUND_REQUESTS_RANGE = Constants.SERVICE_URL + '/wallet/agent-fund-requests-range';
  static WALLET_TRANSACTIONS: string = Constants.SERVICE_URL + '/reports/wallet-transactions';
  static USER_TRANSACTIONS: string = Constants.SERVICE_URL + '/reports/getTransactions';
  static CHANGE_PASSWORD_URL: string = Constants.SERVICE_URL + '/password/change';
  static UPLOAD_USER_DATA_URL: string = Constants.SERVICE_URL + '/agents/upload/agent';
  static UPLOAD_BULK_RECHARGE_URL: string = Constants.SERVICE_URL + '/agents/recharge/bulk';
  static TOKEN_EXPIRED_ERROR = 'TK_400';
  static SEARCH_USER_URL = Constants.SERVICE_URL + '/users/search';
  static REFRESH_TOKEN_URL: string = Constants.SERVICE_URL + '/refreshToken';

  // platform user types
  static ADMIN_USERTYPE = 'ADMIN';
  static AGENT_USERTYPE = 'AGENT';
  static SUPER_AGENT_USERTYPE = 'SUPER_AGENT';
  static SUB_SUPER_AGENT_USERTYPE = 'SUB_SUPER_AGENT';
  static CUSTOMER_USERTYPE = 'CUSTOMER';
  static SWIFTA_USERTYPE = 'SWIFTA';
  static GUEST_USERTYPE = 'GUEST';
  static ALL_USERTYPE = 'ALL';


  // platform unique keys
  static ADMIN_KEY = 'ADMIN_KEY_';
  static AGENT_KEY = 'AGENT_KEY_';
  static CUSTOMER_KEY = 'CUSTOMER_KEY_';
  static SWIFTA_KEY = 'SWIFTA_KEY_';
  static GUEST_KEY = 'GUEST_KEY_';


  // platform wallet types
  static MAIN_WALLET = 'WALLET_MAIN';
  static COMMISSION_WALLET = 'WALLET_COMMISSION';

  // platform transaction types
  static DATA_TRANSACTION = 'DATA_TRANSFER';
  static AIRTIME_TRANSACTION = 'AIRTIME_TRANSFER';

  // platform permissions
  static CAN_DO_ALL = 'ALL';
  static CAN_CREATE_ADMIN = 'CREATE_ADMIN';
  static CAN_DELETE_ADMIN = 'DELETE_ADMIN';
  static CAN_VIEW_ADMIN = 'VIEW_ADMIN';
  static CAN_UPDATE_ADMIN = 'UPDATE_ADMIN';
  static CAN_BLOCK_ADMIN = 'BLOCK_ADMIN';
  static CAN_UNBLOCK_ADMIN = 'UNBLOCK_ADMIN';

  static CAN_CREATE_AGENT = 'CREATE_AGENT';

  static CAN_CREATE_SUPER_AGENT = 'CREATE_SUPER_AGENT';
  static CAN_VIEW_SUPER_AGENT = 'VIEW_SUPER_AGENT';
  static CAN_UPDATE_SUPER_AGENT = 'UPDATE_SUPER_AGENT';

  static CAN_CREATE_SUB_SUPER_AGENT = 'CREATE_SUB_SUPER_AGENT';
  static CAN_VIEW_SUB_SUPER_AGENT = 'VIEW_SUB_SUPER_AGENT';
  static CAN_UPD_SUB_SUPER_AGENT = 'VIEW_SUB_SUPER_AGENT';


  static CAN_DELETE_AGENT = 'DELETE_AGENT';
  static CAN_VIEW_AGENT = 'VIEW_AGENT';
  static CAN_UPDATE_AGENT = 'UPDATE_AGENT';
  static CAN_FUND_AGENT = 'FUND_AGENT';
  static CAN_FUND_WALLET = 'FUND_WALLET';
  static CAN_BLOCK_AGENT = 'BLOCK_AGENT';
  static CAN_UNBLOCK_AGENT = 'UNBLOCK_AGENT';

  static CAN_BLOCK_CUSTOMER = 'BLOCK_CUSTOMER';
  static CAN_UNBLOCK_CUSTOMER = 'UNBLOCK_CUSTOMER';
  static CAN_VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS';

  static CAN_CREATE_ROLE = 'CREATE_ROLE';
  static CAN_DELETE_ROLE = 'DELETE_ROLE';
  static CAN_VIEW_ROLE = 'VIEW_ROLE';
  static CAN_UPDATE_ROLE = 'UPDATE_ROLE';

  static CAN_VIEW_SYSTEM_REPORT = 'VIEW_SYSTEM_REPORT';
  static CAN_SYSTEM_SETTINGS = 'SYSTEM_SETTINGS';

  static CAN_REQUEST_FUND = 'REQUEST_FUND';


  // agent permissions
  static CAN_AGENT_REQUEST_FUND = 'AGENT_REQUEST_FUND';


  static getNoTokenHeaders(retry = 'true', popupError = 'true'): {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'True',
        TokenRefresh: 'False',
        retry,
        popupError
      })
    };
  }

  static RefreshTokenHttpHeaders(retry = 'true', popupError = 'true'): {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'True',
        TokenRefresh: 'True',
        retry,
        popupError,
      })
    };
  }

  static getTokenHttpHeaders(retry = 'true', popupError = 'true'): {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/collection+json',
        'Access-Control-Allow-Origin': '*',
        'No-Auth': 'False',
        retry,
        'popup-error': popupError
      })
    };
  }

  static getTokenImageHttpHeaders(retry = 'true', popupError = 'true'): {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'No-Auth': 'False',
        'Access-Control-Allow-Origin': '*',
        retry,
        'popup-error': popupError
      })
    };
  }

// set default request header
  static getRequestDefaultHeader(token: any): HttpHeaders {
    if (token === null){
      window.location.href = '/';
    }
    return  new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: token
    });
  }

  // set default request header with no token
  static getNoTokenRequestDefaultHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

  }

// set refresh token header
  static getRefreshTokenRequestDefaultHeader(token: any): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Refresh-Token', token);
    return headers;
  }
  /**
   * get Request Header
   */

  static getRequestHeader(): {headers: HttpHeaders} {
    return {headers: Constants.getRequestDefaultHeader('')};
  }

  static getMultipartRequestHeader(token: any): HttpHeaders{
    return new HttpHeaders({
      'Access-Control - Allow - Origin': '* ',
      Authorization: token
    });
  }

  static getNoTokenRequestOption(extraHeaderOptions?: {}): { headers: HttpHeaders} {
    const headers = Constants.getNoTokenRequestDefaultHeader();
    if (extraHeaderOptions){
      Object.keys(extraHeaderOptions).forEach( (key) => {
        headers.append(key, extraHeaderOptions[key]);
      });
    }
    return {headers: Constants.getNoTokenRequestDefaultHeader()};
  }

  // static getRequestOption(token: any, httpOptions?: {}): {} {
  //   // let headers = Constants.getRequestDefaultHeader(token);
  //   // if (extraHeaderOptions){
  //   //   Object.keys(extraHeaderOptions).forEach( (key) => {
  //   //    headers = headers.append(key, extraHeaderOptions[key]);
  //   //   });
  //   // }
  //   return {
  //     headers: Constants.getRequestDefaultHeader(token),
  //     ...httpOptions
  //   };
  // }
  static getFileRequestOption(token: any): {headers: HttpHeaders} {
    let headers = Constants.getRequestDefaultHeader(token);
    headers = headers.append('responseType', 'blob');
    return {headers};
  }

  static getRefreshTokenRequestOption(token: any): {headers: HttpHeaders} {
    return  {headers: Constants.getRefreshTokenRequestDefaultHeader(token)};
  }

  static getMultipartRequestOption(token: any, extraHeaderOptions?: {}): {headers: HttpHeaders} {
    let headers = Constants.getMultipartRequestHeader(token);
    if (extraHeaderOptions){
      Object.keys(extraHeaderOptions).forEach( (key) => {
        headers = headers.append(key, extraHeaderOptions[key]);
      });
    }
    return {headers};
  }

}
