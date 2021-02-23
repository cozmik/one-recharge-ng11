import { Component, OnInit, ViewChild } from '@angular/core';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {StorageService} from '../../../../../../core/services/storage-service/storage.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import {Constants} from '../../../../../../shared/Constants';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MobileNetworks} from '../../../../../../shared/mobile-networks';
import {TransactionsResponse} from '../../../../../../core/mocks/transactionsResponse.model';
import {FlutterWaveResponse} from "../../../../../../core/mocks/flutterwaveResponse.model";
import {RechargeResponse} from "../../../../../../core/mocks/rechargeResponse.model";

declare var window: any;
@Component({
  selector: 'app-buy-airtime',
  templateUrl: './buy-airtime.component.html',
  styleUrls: ['./buy-airtime.component.scss']
})
export class BuyAirtimeComponent implements OnInit {
  getpaidSetup: any;
  // ravePay:any;
  transactionID: string;

  public airtimeForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';
  @ViewChild(FormGroupDirective) _airtimeForm;

  public networksWithId = [];
  public networksLogoPath: any = [];
  public setId = null;
  public switchState: string;
  public networks: any;
  public isloading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public isRecharging : boolean;
  public isCommissionWallet = false;
  public rechargeResponse : any;

  public userEmail: any;
  public selectedNetwork: string;
  public amount: number;
  public mobile: number;
  public network: any;
  private previousRechargeObj: any;


  public rechargeObj : any = {
    'amount': 0,
    'fromWallet': '',
    'networkId': 0,
    'receiverMsisdn': '',
    'networkName': ''
  };


  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public fb: FormBuilder, public customer : UserService, public toast: ToastService,
              public storage : StorageService) {

    // this.sharedService.userWallet.subscribe(this.getWallet);
    this.isLoadingNetworks = false;
    this.switchState = 'recharge';

    this.networks = [];
    this.networksLogoPath = MobileNetworks.networksLogoPath;
    this.isloading = false;
    this.isRecharging = false;
    this.createForm();

  }

  createForm(): void {
    this.airtimeForm = this.fb.group({
      amount: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      networkId: ['', [Validators.required]],
    });
  }

  setNetwork(id : any){
    const networkName = this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
    this.selectedNetwork = networkName;
    console.log(networkName);
  }

  getNetworkName(id:any){
    return this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  }


  checkNum() {
    if (this.airtimeForm.value.mobile !== null && this.airtimeForm.value.mobile.length  !==  11) {
      this.airtimeForm.controls.mobile.setErrors({'numberValid': true});
    }
  }

  resetForm(external = false){
    if(external){
      this.network = null;
      this.mobile = null;
      this.amount = null;
      return false;
    }
    this._airtimeForm.resetForm();
    this._airtimeForm.form.markAsPristine();
    this._airtimeForm.form.markAsUntouched();
    this._airtimeForm.form.updateValueAndValidity();
  }


  goToPage(page : string = 'recharge'){
    this.switchState = page;
  }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  getAllNetworks = () => {
    this.anonymousService.getNetworks().subscribe(
      response => {
        console.log('************ Networks list ****************');
        console.log(response.data);
        this.networks = response.data;
        console.log(this.network);
        this.getNetworksWithId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllNetworks, err);
        this.isLoadingNetworks = false;
        console.log(this.errorResponse);

      }
    )
  };
  //// Sort data ////////////////////
  getNetworksWithId() {
    this.networksWithId = [];

    this.networks.sort ( (a, b) => {
      return - ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
    });

    for (let i = 0; i < this.networks.length; i++ ) {
      const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
      sortedNetworks.id = i + 1;
      sortedNetworks.logoPath = this.networksLogoPath[this.networks[i]['networkCodeName']];
      sortedNetworks.data = this.networks[i];
      this.networksWithId.push(sortedNetworks);
      this.isLoadingNetworks = false;
    }
    console.log('************ Networks with id ****************');
    console.log(this.networksWithId);
    localStorage.setItem('networks', JSON.stringify(this.networksWithId));
  }

  // Submit recharge form
  onSubmit(): void {
    this.isloading = true;
    this.rechargeObj.networkId = this.network;
    this.rechargeObj.receiverMsisdn = this.mobile;
    this.rechargeObj.amount = this.amount;
    this.rechargeObj.networkName = this.getNetworkName(this.network);

    localStorage.setItem(Constants.CUSTOMER_KEY + 'recharge' , JSON.stringify(this.rechargeObj));

   // this.generateTransactionId();
    this.switchState = 'recharge-verify';
    console.log('recharge Request', this._airtimeForm.value);
    console.log('recharge rechargeObj', this.rechargeObj);
  }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  generateTransaction = () => {
    this.isRecharging = true;
    this.anonymousService.generateTransactionId().subscribe(
      response => {
        console.log('************ generateTransactionId ****************');
        console.log(response.data[0].transactionId);
        this.transactionID = response.data[0].transactionId;
        this.payWithRave();
      },
      err => {
        console.log(err);
        this.error.errorHandlerWithText(this.generateTransaction, err);

      }
    )
  };

  public payWithRave() {
    this.isRecharging = false;


    let ravePay = window.getpaidSetup({
      PBFPubKey: Constants.CUSTOMER_GUEST_PAYMENT_KEY,
         customer_email: this.userEmail,
      // customer_email: Constants.SUPPORT_EMAIL,
          amount: this.rechargeObj.amount,
          customer_phone: this.rechargeObj.receiverMsisdn,
          currency: 'NGN',
          payment_method: 'both',
          txref: this.transactionID,
          meta: [{
            metaname: 'flightID',
            metavalue: 'AP1234'
          }],
          onclose: function() {
          },
          callback: function(response) {
            const txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
            console.log('txref ', txref);
            console.log('This is the response returned after a charge', response);
            const flutterResponse = new FlutterWaveResponse(response.data, response.name, response.success, response.tx);
            if ( response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0' )
            {
              // redirect to a success page

              const customerRechargeObj = {
                'amount': 0,
                'cardLast4Digit': '',
                'networkId': 0,
                'paymentId': 0,
                'receiverMsisdn': '',
                'status': '',
                'transactionId': '',
                'transactionRef': ''
              };

              const previousRechargeObj: any = JSON.parse(localStorage.getItem(Constants.CUSTOMER_KEY + 'recharge'));

              customerRechargeObj.receiverMsisdn = previousRechargeObj.receiverMsisdn;
              customerRechargeObj.networkId = previousRechargeObj.networkId;
              customerRechargeObj.amount = previousRechargeObj.amount;
              customerRechargeObj.paymentId = flutterResponse.tx.paymentId;
              customerRechargeObj.transactionId = flutterResponse.tx.txRef;
              customerRechargeObj.status = flutterResponse.tx.status;

              const paymentObj = {
                'payload' : customerRechargeObj,
                'type': 'airtime',
                'homeUrl' : 'customer/',
                'packageTransactionUrl' : 'customer/',
                'repeatTransactionUrl' : 'customer/airtime'
              }

              console.log('paymentObj', paymentObj);

              localStorage.setItem(Constants.CUSTOMER_KEY + 'paymentObjKey', JSON.stringify(paymentObj));

              window.location.href = '#/customer/payment-status';

              ravePay.close();

            }
            else {
              // redirect to a failure page.
            }

            // this.ravePay.close(); // use this to close the modal immediately after payment.
          }
        });


  }

  backToStart(){

  }

  toggleWallet() {
    this.isCommissionWallet = !this.isCommissionWallet;
    console.log(this.isCommissionWallet);
  }

  ngOnInit(): void {

    this.userEmail = JSON.parse(localStorage.getItem(Constants.PROFILE)).email;
    this.getAllNetworks();
  }

}
