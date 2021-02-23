import { Component, OnInit, ViewChild } from '@angular/core';
import {AnonymousService} from '../../../core/services/anonymous-service';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {UserService} from '../../../core/services/users-service/user-service';
import {ErrorService} from '../../../core/services/error_service/error.service';
import {StorageService} from '../../../core/services/storage-service/storage.service';
import {ToastService} from '../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import {Constants} from '../../../shared/Constants';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RechargeResponse} from '../../../core/mocks/rechargeResponse.model';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  public networksWithId: any;
  public paymentObject: any;


  public switchState: string; // switch component depending on response ( success, failed , pending )
  public isloading: boolean;
  public transactionResponse: any; // response gotten from calling the endpoint with payload

  public userType: string;
  public transactionType: string;
  public payload: any;
  public packageTransactionUrl: string;
  public repeatTransactionUrl: string;
  public homeUrl: string;



  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public fb: FormBuilder, public user : UserService, public toast: ToastService,
              public storage : StorageService) {

    this.switchState = 'transaction-loading';
    this.networksWithId = [];
    this.isloading = false;
  }

  getNetworkName(id:any){
    return this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  }

  goToPage(page : string = 'transaction-loading'){
    this.switchState = page;
  }

  goToPackage(){
    this.router.navigate([this.packageTransactionUrl]);
  }

  repeatTransaction(){
    this.router.navigate([this.repeatTransactionUrl]);
  }

  goToHome(){
    this.router.navigate([this.homeUrl]);
  }

  processTransaction(){
    console.log('processing transaction');

    console.log('type', this.transactionType.toUpperCase());
    console.log('payload', this.payload);

    console.log('process type is airtime : ', this.transactionType.toUpperCase() === 'AIRTIME');
    console.log('process type is wallet : ', this.transactionType.toUpperCase() === 'WALLET');
    console.log('process type is data : ', this.transactionType.toUpperCase() === 'DATA');

    if(this.userType === Constants.CUSTOMER_USERTYPE){
      if(this.transactionType.toUpperCase() === 'AIRTIME'){
        console.log('call customerPurchaseAirtime')
        this.customerPurchaseAirtime();
      }
      else if(this.transactionType.toUpperCase() === 'DATA'){
        console.log('call customerPurchaseData')
        this.customerPurchaseData();
      }
      else{}
    }

    else if(this.userType === Constants.AGENT_USERTYPE){
      if(this.transactionType.toUpperCase() === 'WALLET'){
        console.log('call agentSelfFundWalet')
        this.agentFundWallet();
      }
    }

    else if(this.transactionType.toUpperCase() === 'DATA'){
        console.log('call guestPurchaseData')
        this.guestPurchaseData();
    }

    else if(this.transactionType.toUpperCase() === 'AIRTIME'){
        console.log('call guestPurchaseAirtime')
        this.guestPurchaseAirtime();
    }
    else{}
  }


  customerPurchaseAirtime = () => {
    console.log('payload before purchaseAirtime', this.payload)
    this.user.customerRecharge(this.payload).subscribe(
      (data: any) => {

        console.log('recharge airtime', data);
        this.transactionResponse = new RechargeResponse(data.data[0]);
        this.renderStatusPage();
      },
      err => {
        console.log('recharge failed . .. .. ');
        this.renderStatusPage();
        console.log(err);
        this.error.errorHandlerWithText(this.customerPurchaseAirtime, err);
      }
    );
  }


  customerPurchaseData = () => {
    console.log('payload before purchaseData', this.payload)
    this.user.customerBuyData(this.payload).subscribe(
      (data: any) => {
        console.log('recharge data', data);
        this.transactionResponse = new RechargeResponse(data.data[0]);
        this.renderStatusPage();
      },
      err => {
        console.log('data failed . .. .. ');
        this.renderStatusPage();
        console.log('error', err);
        this.error.errorHandlerWithText(this.customerPurchaseData, err);
       // this.toast.showError(error.message, '');
      }
    );
  }


  guestPurchaseAirtime = () => {
    console.log('payload before guest purchaseAirtime', this.payload)
    this.user.guestRecharge(this.payload).subscribe(
      (data: any) => {
        console.log('recharge data', data);
        this.transactionResponse = new RechargeResponse(data.data[0]);
        this.renderStatusPage();
      },
      err => {
        console.log('recharge failed . .. .. ');
        this.renderStatusPage();
        console.log(err);
        this.error.errorHandlerWithText(this.guestPurchaseAirtime, err);
      }
    );
  }


  guestPurchaseData = () => {
    console.log('payload before guest purchaseData', this.payload)
    this.user.guestBuyData(this.payload).subscribe(
      (data: any) => {
        console.log('recharge data', data);
        this.transactionResponse = new RechargeResponse(data.data[0]);
        this.renderStatusPage();
      },
      err => {
        console.log('data failed . .. .. ');
        this.renderStatusPage();
        console.log(err);
        const error = this.error.errorHandlerWithText(this.guestPurchaseData, err);
        this.toast.showError(error.message,'');
        this.clearTransactionData();
      }
    );
  }

  agentFundWallet = () => {
    console.log('payload before purchaseAirtime', this.payload)
    this.user.agentSelfFundWallet(this.payload).subscribe(
      data => {
        console.log('recharge data', data);
        this.transactionResponse = new RechargeResponse(data.data[0]);
        this.renderStatusPage();
      },
      err => {
        console.log('recharge failed . .. ');
        this.renderStatusPage();
        console.log(err);
        this.error.errorHandlerWithText(this.agentFundWallet, err);
      }
    );
  }

  renderStatusPage = () => {
    this.clearTransactionData();
    console.log(this.transactionResponse);

    if(this.transactionResponse && this.transactionResponse.status === 1){
      console.log('success');
      this.goToPage('transaction-success');
    }
    else if(this.transactionResponse && this.transactionResponse.status === 0){
      console.log('failed');
      this.goToPage('transaction-failed');
    }
    else if(this.transactionResponse && this.transactionResponse.status === -1){
      console.log('pending');
      this.goToPage('transaction-pending');
    }
    else{
      this.goToPage('transaction-failed');
    }
  }

  clearTransactionData(){
    localStorage.removeItem(Constants.CUSTOMER_KEY + 'paymentObjKey');
    localStorage.removeItem(Constants.CUSTOMER_KEY + 'recharge');
    localStorage.removeItem(Constants.CUSTOMER_KEY + 'data');
    localStorage.removeItem(Constants.AGENT_KEY + 'paymentObjKey');
    localStorage.removeItem(Constants.AGENT_KEY + 'recharge');
    localStorage.removeItem(Constants.AGENT_KEY + 'data');
    localStorage.removeItem(Constants.GUEST_KEY + 'paymentObjKey');
    localStorage.removeItem(Constants.GUEST_KEY + 'recharge');
    localStorage.removeItem(Constants.GUEST_KEY + 'data');

  }

  init(){
    if(JSON.parse(localStorage.getItem(Constants.PROFILE))){
      this.userType = JSON.parse(localStorage.getItem(Constants.PROFILE)).userType;
    }

    this.networksWithId = JSON.parse(localStorage.getItem('networks'));

    if(this.userType && this.userType.toUpperCase() === Constants.CUSTOMER_USERTYPE){
      console.log('in customer mode');
      this.paymentObject = JSON.parse(localStorage.getItem(Constants.CUSTOMER_KEY + 'paymentObjKey'));
    }
    else if(this.userType && this.userType === Constants.AGENT_USERTYPE){
      this.paymentObject = JSON.parse(localStorage.getItem(Constants.AGENT_KEY + 'paymentObjKey'));
    }
    else{
      this.paymentObject = JSON.parse(localStorage.getItem(Constants.GUEST_KEY + 'paymentObjKey'));
    }

    console.log('this.paymentObject', this.paymentObject);
    if(this.paymentObject !== null){
      console.log('payment object is not null');
      this.transactionType = this.paymentObject.type;
      this.payload = this.paymentObject.payload;

      this.packageTransactionUrl = this.paymentObject.packageTransactionUrl;
      this.repeatTransactionUrl = this.paymentObject.repeatTransactionUrl;
      this.homeUrl = this.paymentObject.homeUrl;

      console.log('transactionpayload',this.paymentObject.payload);
      console.log('transactionType',this.paymentObject.type);
      this.processTransaction();
    }
    else{
      if(this.homeUrl){
        this.router.navigate([this.homeUrl]);
      }
      else{
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit(): void {
    console.log('****** init *****');
    this.init();
  }

}
