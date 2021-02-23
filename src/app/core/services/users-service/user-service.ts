
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {Constants} from '../../../shared/Constants';
import {User} from '../../mocks/user/user.model';
import {TransactionsResponse} from '../../mocks/transactionsResponse.model';
import {PagedDataModel} from '../../mocks/paged-data.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface PagedTransactionData extends PagedDataModel {
  content: Array<TransactionsResponse>;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Observable string sources
  public emitChangeSource = new Subject();

  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  public loggedInUser: User;

  // Service message commands
  emitChange(change: string) {
    this.emitChangeSource.next(change);
  }

  constructor(public http: HttpClient) {
    if ((JSON.parse(localStorage.getItem(Constants.PROFILE)))){
      this.loggedInUser = new User(JSON.parse(localStorage.getItem(Constants.PROFILE)));
    }
  }

  getAdmins(): Observable<any> {
    return this.http.get(Constants.ADMIN_URL + '?all=1', Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getAgents(userId ?: number, offset = 0, pageSize = 20,  search = ''): Observable<any> {
    return this.http.get(Constants.AGENT_URL + (pageSize ? '?pageSize=' + pageSize : '') + (userId ? '&superAgentId=' + userId : '')
      + (offset ? '&offset=' + offset : '') +
      (search ? '&search=' + search : ''), Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // 0 - for pending, 1 - for approved, 2 - all
  getFrozenAccounts(type = 2): Observable<any> {
    return this.http.get(Constants.FREEZE_ACCOUNT_URL + (type ? '?status=' + type : ''), Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getStatistics(): Observable<any> {
    return this.http.get(Constants.ADMIN_STATISTICS_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // chart statistics
  getChartStatistics(): Observable<any> {
    return this.http.get(Constants.CHART_REPORT_STATISTICS_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // deprecated
  getAgentTransactions(userId: number, period: string, useRange: boolean, all = false): Observable<any> {
    if (all){
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange === false) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId  + '/' + period,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId + period + '&status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }

    return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getRecentTransactions(userId: number, offset = 0, pageSize = 20): Observable<any> {
    return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId + '?offset=' + offset + '&pageSize=' + pageSize + '&downloadSuccessful=1&downloadFailed=1&downloadPending=1',
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getAirtimeTransactions(userId: number, period: string, useRange: boolean,
                         download = 0, success = 1,
                         failed = 1, pending = 1): Observable<any> {
    if (period && useRange === false && download === 0) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '')  + '/' + period,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange && download === 0) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '') + '/'  + period + '&status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange === false && download === 1) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '')  + '/' + period + 'download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getTokenHttpHeaders());
    }
    else if (period && useRange && download === 1) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '') + '/' + period + 'download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? userId : ''),
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // https://onerecharge.com/onerecharge/api/reports/transactions/today?offset=1&pageSize=20&
  // status=2&download=1&downloadSuccessful=1&downloadFailed=1&downloadPending=1





  getAdminWalletTransactions(userId: number, period: string,
                             useRange: boolean, offset = 1, pageSize = 20,
                             status = 2,  download = 0,
                             success = 1, failed = 1): Observable<any>{
    if (period && useRange === false && download === 0) {
      return this.http.get(Constants.WALLET_TRANSACTIONS_URL + (userId ? '/' + userId : '')  + '/' + period + '?offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange && download === 0) {
      return this.http.get(Constants.WALLET_TRANSACTIONS_URL + (userId ? '/' + userId : '') + '/'  + period + '&offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange === false && download === 1) {
      return this.http.get(Constants.WALLET_TRANSACTIONS_URL + (userId ? '/' + userId : '')  + '/' + period + '?offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    else if (period && useRange && download === 1) {
      return this.http.get(Constants.WALLET_TRANSACTIONS_URL + (userId ? '/' + userId : '') + '/' + period + '?offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    return this.http.get(Constants.WALLET_TRANSACTIONS_URL + (userId ? userId : ''),
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getWalletTransactionsByPeriod(period?: string, download = 0, success = 1, failed = 1, pending = 1): Observable<any> {
    if (period && download === 0) {
      return this.http.get(Constants.WALLET_TRANSACTIONS + '/' + period,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && download === 1) {
      return this.http.get(Constants.WALLET_TRANSACTIONS + '/' + period + 'download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    return this.http.get(Constants.WALLET_TRANSACTIONS,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getAgentWalletTransactions(userId: number, period: string,
                             useRange: boolean, download = 0,
                             success = 1, failed = 1,
                             pending = 1): Observable<any> {
    if (period && useRange === false && download === 0) {
      return this.http.get(Constants.USERS_WALLET_TRANSACTIONS_URL  + (userId ? '/' + userId : '') + '/' + period,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange && download === 0) {
      return this.http.get(Constants.USERS_WALLET_TRANSACTIONS_URL  + (userId ? '/' + userId : '') + '/' +  period + '&status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange === false && download === 1) {
      return this.http.get(Constants.USERS_WALLET_TRANSACTIONS_URL  + (userId ? '/' + userId : '') + '/' + period + '?download=' + download
      + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    else if (period && useRange && download === 1) {
      return this.http.get(Constants.USERS_WALLET_TRANSACTIONS_URL  + (userId ? '/' + userId : '') + '/' +  period + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    return this.http.get(Constants.USERS_WALLET_TRANSACTIONS_URL + userId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getAdminTransactions(userId: number, period: string,
                       useRange: boolean, offset = 1, pageSize = 20, status = 2,
                       download = 0, success = 1, failed = 1, pending = 1): Observable<any>{
    if (period && useRange === false && download === 0) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '')  + '/' + period + '?offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange && download === 0) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '') + '/'  + period + '&offset=' + offset + '&pageSize=' + pageSize + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange === false && download === 1) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? '/' + userId : '')  + '/' + period + '?status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    else if (period && useRange && download === 1) {
      return this.http.get(Constants.AIRTIME_TRANSACTIONS +
        (userId ? '/' + userId : '') + '/' + period + '&status=' + status + '&download=' + download
        + '&downloadSuccessful=' + success + '&downloadFailed=' + failed + '&downloadPending=' + pending,
        Constants.getFileRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN)));
    }
    return this.http.get(Constants.AIRTIME_TRANSACTIONS + (userId ? userId : ''),
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  retryTransaction(tranxId: any): Observable<any>{
    return this.http.put(Constants.TRANSACTIONS + '/retry/' + tranxId , {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // https://test.mfisa.com/tig/api/transactions/refund/741478021a7b40ed89b6348d1b9fa4e1
  refundTransaction(tranxId: any): Observable<any>{
    return this.http.put(Constants.TRANSACTIONS + '/refund/' + tranxId , {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  updateTransactionToSuccess(tranxId: any): Observable<any>{
    return this.http.put(Constants.TRANSACTIONS + '/update-successful/' + tranxId , {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


 // fund-requests-range?startDate=1522540800000&endDate=1522972800000&status=2

  getFundRequestHistory(period?: string, useRange?: boolean): Observable<any> {
    if (period && useRange === false) {
      return this.http.get(Constants.FUND_REQUESTS + '?status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange) {
      return this.http.get(Constants.FUND_REQUESTS_RANGE + period + '&status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    return this.http.get(Constants.FUND_REQUESTS_HISTORY,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  // https://137.74.50.58/golden-rule/api/wallet/agent-fund-requests/6?status=2
  getAgentFundRequestHistory(userId: number, period?: string, useRange?: boolean): Observable<any> {
    if (period === 'all' && useRange === false) {
      return this.http.get(Constants.AGENT_FUND_REQUESTS + '/' + userId + '?status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    else if (period && useRange) {
      return this.http.get(Constants.AGENT_FUND_REQUESTS_RANGE + '/' + userId + period + '&status=2',
        Constants.getTokenHttpHeaders()).pipe(
        map(res => res));
    }
    return this.http.get(Constants.AGENT_FUND_REQUESTS + '/' + userId + '?status=2',
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
    // return this.http.get(Constants.FUND_REQUESTS_HISTORY,
    //   Constants.getTokenHttpHeaders())
    //   .map(res => res);
  }



  // get all customers
  getCustomers(): Observable<any> {
    return this.http.get(Constants.CUSTOMER_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  // type :  1 = Airtime Transactions, 2 = wallet transactions
  // status : -1 = pending, 0 = failed, 1 = successful, 2 = all

  getUserTransactions(userId: number, transactionType = 1, status = 1): Observable<any> {
    return this.http.get(Constants.USER_TRANSACTIONS + '/' + userId +
      '?transactionType=' + transactionType + '&status=' + status, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getTransactionsByUser(userId: number, pageSize = 10): Observable<any> {
    return this.http.get(Constants.AIRTIME_TRANSACTIONS + '/' + userId + '?pageSize=' + pageSize, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // https://137.74.50.58/onerecharge/api/reports/transactions/48?pageSize=5

  // get all Payouts
  getPayouts(): Observable<any> {
    return this.http.get(Constants.PAYOUTS_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // request payout
  requestPayout(amount: number): Observable<any> {
    return this.http.post(Constants.PAYOUTS_URL + '/request-new?amount=' + amount, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // approve payout
  approvePayout(id: number): Observable<any> {
    return this.http.put(Constants.PAYOUTS_URL + '/approve-payout/'  + id, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // confirm payout
  confirmPayout(id: number): Observable<any> {
    return this.http.put(Constants.PAYOUTS_URL + '/confirm-payout/'  + id, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // decline payout
  declinePayout(id: number): Observable<any> {
    return this.http.put(Constants.PAYOUTS_URL + '/decline-payout/'  + id, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // update customer
  updateCustomer(userData: any, userId: number): Observable<any> {
    return this.http.put(Constants.CUSTOMER_URL + 'update/' + userId, userData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  customerRecharge(rechargeObj: any): Observable<any>{
    console.log('customer Recharge payload ', rechargeObj);
    return this.http.post(Constants.CUSTOMER_RECHARGE, rechargeObj,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  customerBuyData(dataObj: any): Observable<any>{
    console.log('customer data payload ', dataObj);
    return this.http.post(Constants.CUSTOMER_BUY_DATA, dataObj,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  guestRecharge(rechargeObj: any): Observable<any>{
    console.log('guest Recharge payload ', rechargeObj);
    return this.http.post(Constants.GUEST_RECHARGE, rechargeObj,
      Constants.getNoTokenHeaders()).pipe(
      map(res => res));
  }


  guestBuyData(dataObj: any): Observable<any>{
    console.log('guest data payload ', dataObj);
    return this.http.post(Constants.GUEST_BUY_DATA, dataObj,
      Constants.getNoTokenHeaders()).pipe(
      map(res => res));
  }


  agentSelfFundWallet(fundObj: any): Observable<any>{
    console.log('agent fund wallet payload ', fundObj);
    return this.http.post(Constants.AGENT_URL + 'self-fund', fundObj,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

// block user
  blockUser(setId: any): Observable<any> {
    return this.http.put(Constants.USERS_URL + setId + Constants.BLOCK, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // resend mail to user resend?adminId=22
  resendActivationMail(setId: any): Observable<any> {
    return this.http.get(Constants.ACTIVATION_URL + 'resend?adminId=' + setId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get user
  getUser(setId: any): Observable<any> {
    return this.http.get(Constants.USERS_URL + setId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

// unblock user
  unblockUser(setId: any): Observable<any> {
    return this.http.put(Constants.USERS_URL + setId + Constants.UNBLOCK, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  deleteUser(setId: any): Observable<any> {
    return this.http.delete(Constants.USERS_URL + setId + Constants.DELETE,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // update agent
  updateUser(userData: any, userId: number): Observable<any> {
    return this.http.put(Constants.AGENT_URL + 'update/' + userId, userData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  fundWallet(agentId: any, amount: number): Observable<any>{
    console.log('where are here as : ', this.loggedInUser);

    if (this.loggedInUser.userType === Constants.AGENT_USERTYPE) {
      return this.http.post(Constants.AGENT_URL + 'fund-wallet/' + agentId + '/' + amount, {},
        Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
    }
    else if (this.loggedInUser.userType === Constants.ADMIN_USERTYPE) {
      return this.http.post(Constants.WALLET_URL + '/fund', {amount, userId: agentId},
        Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
    }
  }

  freezeAccount(freezeObj: any): Observable<any>{
    return this.http.post(Constants.FREEZE_ACCOUNT, freezeObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  airtimeRecharge(rechargeObj: any): Observable<any>{
    return this.http.post(Constants.AGENTS_RECHARGE, rechargeObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  // multiple user by uploading sheet
  //  // recharge/bulk?channel=web&fromWallet=WALLET_MAIN
  bulkAirtimeRecharge(formData: FormData): Observable<any> {
    return this.http.post(Constants.UPLOAD_BULK_RECHARGE_URL + '?channel=web&fromWallet=WALLET_MAIN', formData,
      Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }



  dataRecharge(dataObj: any): Observable<any>{
    return this.http.post(Constants.AGENTS_BUY_DATA, dataObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }


  // request funding and upload sheet
  requestFunding(fundingData: any, formData): Observable<any> {
    let payload = '';
    for (const key in fundingData){
      if (fundingData.hasOwnProperty(key)){
        payload += '' + key + '=' + fundingData[key] + '&';
      }
    }
    payload = payload.replace(/&+$/g, ''); // remove the trailing &
    console.log('******* payload ********');
    console.log(payload);
    return this.http.post(Constants.REQUEST_FUNDING + payload, formData,
      Constants.getMultipartRequestOption(localStorage.getItem(Constants.ACCESS_TOKEN))).pipe(
      map(res => res));
  }


  updateNetworkConfig(id, networkObj: any): Observable<any>{
    return this.http.put(Constants.NETWORK_URL + id + '/update', networkObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }


  // get airtime network config
  getAirtimeNetworkConfig(): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'airtime-config', Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  // get user airtime network config
  getUserAirtimeNetworkConfig(userID): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'user-airtime-network-config/' + userID,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get loggedIn user airtime network config
  getLoggedInUserAirtimeNetworkConfig(): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'user-airtime-network-config/',
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get loggedIn user data network config
  getLoggedInUserDataNetworkConfig(): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'user-data-network-config/',
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  deleteUserAirtimeNetworkConfig(setId: any): Observable<any> {
    return this.http.delete(Constants.NETWORK_URL + 'user-airtime-network-config/' + setId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  updateAirtimeNetworkConfig(id, networkObj: any): Observable<any>{
    return this.http.put(Constants.NETWORK_URL + '/airtime-config/' + id, networkObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  // block airtime network
  blockAirtimeNetwork(setId: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + setId + '/block-airtime', {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // unblock airtime network
  unblockAirtimeNetwork(setId: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + setId + '/unblock-airtime', {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // block data network
  blockDataNetwork(setId: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + setId + '/block-data', {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // unblock data network
  unblockDataNetwork(setId: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + setId + '/unblock-data', {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get data network config
  getDataNetworkConfig(): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'data-config', Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get user data network config
  getUserDataNetworkConfig(userID): Observable<any> {
    return this.http.get(Constants.NETWORK_URL + 'user-data-network-config/' + userID, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  deleteUserDataNetworkConfig(setId: any): Observable<any> {
    return this.http.delete(Constants.NETWORK_URL + 'user-data-network-config/' + setId,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  createUserDataNetworkConfig(configObj: any): Observable<any>{
    return this.http.post(Constants.NETWORK_URL + 'user-data-network-config/', configObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  createUserAirtimeNetworkConfig(configObj: any): Observable<any>{
    return this.http.post(Constants.NETWORK_URL + 'user-airtime-network-config/', configObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  updateDataNetworkConfig(id, networkObj: any): Observable<any>{
    return this.http.put(Constants.NETWORK_URL + 'data-config/' + id, networkObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  getFundRequestsHistory(): Observable<any> {
    return this.http.get(Constants.FUND_REQUESTS_HISTORY,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // get all networks
  getNetworks(): Observable<any> {
    return this.http.get(Constants.NETWORK_URL, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }



// unblock user
  unblockNetwork(setId: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + setId + Constants.UNBLOCK, {},
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // update network
  updateNetwork(networkFormData: any , id: any): Observable<any> {
    return this.http.put(Constants.NETWORKS_URL + id + '/update/', networkFormData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  deleteNetwork(setId: any): Observable<any> {
    return this.http.delete(Constants.NETWORKS_URL + setId + Constants.DELETE,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }


  getFundRequests(): Observable<any> {
    return this.http.get(Constants.FUND_REQUESTS + '?status=0',
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getCommissionAccounts(): Observable<any> {
    return this.http.get(Constants.COMMISSION_ACCOUNTS,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  declineFundAgent(requestId: number): Observable<any> {
    return this.http.put(Constants.MANAGE_FUND_REQUEST_URL + '/' + requestId + '/decline', null,
      {responseType: 'text', ...Constants.getTokenHttpHeaders()}).pipe(
      map(res => res));
  }

  acceptFundAgent(requestId: number): Observable<any> {
    return this.http.put(Constants.MANAGE_FUND_REQUEST_URL + '/' + requestId + '/accept', null,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  fundAgent(paymentDetails: any): Observable<any> {
    return this.http.post(Constants.FUND_AGENT, paymentDetails, Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  agentSelfFund(fundObj: any): Observable<any>{
    return this.http.post(Constants.AGENTS_SELF_FUND, fundObj,
      Constants.getTokenHttpHeaders()).pipe(
    map(res => res));
  }

  updateAdmin(userFormData: any, id): Observable<any> {
    return this.http.put(Constants.ADMIN_UPDATE_URL + id , userFormData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  // update agent
  updateAgent(agentData: any, agentId: number): Observable<any> {
    return this.http.put(Constants.AGENT_URL + 'update/' + agentId, agentData,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUserAgents(id): Observable<any> {
    return this.http.get(Constants.AGENT_URL + '?superAgentId=' + id,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }

  getUserPermission(id): Observable<any> {
    return this.http.get(Constants.USER_PERMISSIONS_URL + id,
      Constants.getTokenHttpHeaders()).pipe(
      map(res => res));
  }
}
