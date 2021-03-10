import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import {ServiceFormBase} from '../../../../common-components/service-form-base';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-guest-service-form',
  templateUrl: './guest-service-form.component.html',
  styleUrls: ['./guest-service-form.component.scss']
})
export class GuestServiceFormComponent implements OnInit {
  public airtimeForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  public networksWithId = [];
  public networksLogoPath: any = [];
  public setId = null;
  public isVerifyDetails: boolean;
  public networks: any;
  public isLoading: boolean;
  public isLoadingServices: boolean;
  public errorResponse: any;
  public userType: string;
  public isRecharging: boolean;
  public switchState: string;
  servicePackage: any;

  services: any;
  service: any;
  category: any;
  ravePay: any;

  public selectedNetwork: string;
  public amount: number;
  public mobile: number;
  public network: any;
  serviceCategories: any[];
  form: FormGroup;
  fields = [];
  private transactionID: string;

  constructor(public sharedService: SharedService,
              public anonymousService: AnonymousService,
              public snackBar: MatSnackBar, public error: ErrorService,
              public authService: AuthService, public fb: FormBuilder,
              public errorService: ErrorService,
              public toast: ToastService,
              public router: Router) {
    this.isLoadingServices = false;
    this.isVerifyDetails = false;
    this.isLoading = false;

  }

  private getServices(): void {
    this.isLoadingServices = true;
    this.anonymousService.getServices().subscribe((res: any) => {
      this.serviceCategories = res.filter(cat => {
        return cat.serviceResponses.some(ser => ser.meta.guestUrl !== null);
      });
      this.isLoadingServices = false;
    });
  }

  // createForm(): void {
  //   this.airtimeForm = this.fb.group({
  //     amount: ['', Validators.required],
  //     mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
  //     networkId: ['', [Validators.required]],
  //   });
  // }

  //// Sort data ////////////////////
  // getNetworksWithId() {
  //   this.networksWithId = [];
  //
  //   this.networks.sort ( (a, b) => {
  //     return - ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
  //   });
  //
  //   for (let i = 0; i < this.networks.length; i++ ) {
  //     const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
  //     sortedNetworks.id = i + 1;
  //     sortedNetworks.logoPath = this.networksLogoPath[this.networks[i]['networkCodeName']];
  //     sortedNetworks.data = this.networks[i];
  //     this.networksWithId.push(sortedNetworks);
  //     this.isLoadingNetworks = false;
  //   }
  //   console.log('************ Networks with id ****************');
  //   console.log(this.networksWithId);
  //   localStorage.setItem('networks', JSON.stringify(this.networksWithId));
  // }
  //
  //
  // setNetwork(id : any){
  //   const networkName = this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  //   this.selectedNetwork = networkName;
  //   console.log(networkName);
  // }

  // getNetworkName(id:any){
  //   return this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  // }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  // private getAllNetworks = () => {
  //   this.isLoadingNetworks = true;
  //   this.anonymousService.getNetworks().subscribe(
  //     (response: any) => {
  //       console.log('************ Networks list ****************');
  //       console.log("NETWORK FROM SERVER IS ",response.data);
  //
  //      /* isAirtimeActive: 1
  //       isDataActive: 1*/
  //
  // this.networks = response.data.filter((res)=>res.isAirtimeActive);
  //
  //       this.getNetworksWithId();
  //     },
  //     err => {
  //       console.log(err);
  //       this.errorResponse = this.error.errorHandlerWithText(this.getAllNetworks, err);
  //       this.isLoadingNetworks = false;
  //       console.log(this.errorResponse);
  //
  //     }
  //   )
  // };

  private generateTransaction = () => {
    this.isRecharging = true;
    this.anonymousService.generateTransactionId().subscribe(
      response => {
        console.log('************ generateTransactionId ****************');
        console.log(response.data[0].transactionId);
        this.transactionID = response.data[0].transactionId;
        // this.payWithRave();
      });
  }

  // checkNum() {
  //   if (this.airtimeForm.value.mobile.length && this.airtimeForm.value.mobile.length  !==  11) {
  //     this.airtimeForm.controls.mobile.setErrors({'numberValid': true});
  //   }
  // }

  // resetForm(){
  //   this._airtimeForm.resetForm();
  //   this._airtimeForm.form.markAsPristine();
  //   this._airtimeForm.form.markAsUntouched();
  //   this._airtimeForm.form.updateValueAndValidity();
  // }

  //
  // backToStart(){
  //   this.isVerifyDetails = false;
  // }
  //
  //

  // Submit recharge form
  onSubmit(): void {
    this.isLoading = true;
    // this.rechargeObj.networkId = this.airtimeForm.value.networkId;
    // this.rechargeObj.receiverMsisdn = this.airtimeForm.value.mobile;
    // this.rechargeObj.amount = this.airtimeForm.value.amount;
    // this.rechargeObj.networkName = this.getNetworkName(this.airtimeForm.value.networkId);
    //
    // localStorage.setItem(Constants.CUSTOMER_KEY + 'recharge' , JSON.stringify(this.rechargeObj));
    //
    // // this.generateTransactionId();
    // this.switchState = 'recharge-verify';
    // console.log('recharge Request', this._airtimeForm.value);
    // console.log('recharge rechargeObj', this.rechargeObj);
  }

  //
  ngOnInit(): void {
    this.getServices();
    // this.getAllNetworks();
  }

  // goToPage(){
  //   this.switchState = 'recharge';
  // }

  //
  //
  //
  // public payWithRave() {
  //   this.isRecharging = false;
  //
  //   console.log('paying');
  //
  //   var ravePay = window.getpaidSetup({
  //     PBFPubKey: Constants.CUSTOMER_GUEST_PAYMENT_KEY,
  // //    customer_email: 'support@lillynaija.com',
  //     customer_email: Constants.SUPPORT_EMAIL,
  //     amount: this.rechargeObj.amount,
  //     customer_phone: this.rechargeObj.receiverMsisdn,
  //     currency: 'NGN',
  //     payment_method: 'both',
  //     txref: this.transactionID,
  //     meta: [{
  //       metaname: 'flightID',
  //       metavalue: 'AP1234'
  //     }],
  //     onclose: function() {
  //     },
  //     callback: function(response) {
  //       const txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
  //       console.log('txref ', txref);
  //       console.log('This is the response returned after a charge', response);
  //       const flutterResponse = new FlutterWaveResponse(response.data, response.name, response.success, response.tx);
  //       console.log(flutterResponse);
  //
  //       if ( response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0' )
  //       {
  //         // redirect to a success page
  //
  //         const guestRechargeObj = {
  //           amount: 0,
  //           cardLast4Digit: '',
  //           networkId: 0,
  //           paymentId: 0,
  //           receiverMsisdn: '',
  //           status: '',
  //           transactionId: '',
  //           transactionRef: ''
  //         };
  //         console.log(guestRechargeObj);
  //
  //         const previousRechargeObj: any = JSON.parse(localStorage.getItem(Constants.CUSTOMER_KEY + 'recharge'));
  //
  //         guestRechargeObj.receiverMsisdn = previousRechargeObj.receiverMsisdn;
  //         guestRechargeObj.networkId = previousRechargeObj.networkId;
  //         guestRechargeObj.amount = previousRechargeObj.amount;
  //         guestRechargeObj.paymentId = flutterResponse.tx.paymentId;
  //         guestRechargeObj.transactionId = flutterResponse.tx.txRef;
  //         guestRechargeObj.status = flutterResponse.tx.status;
  //
  //         const paymentObj = {
  //           'payload' : guestRechargeObj,
  //           'type': 'airtime',
  //           'homeUrl' : '/',
  //           'packageTransactionUrl' : '',
  //           'repeatTransactionUrl' : ''
  //         }
  //
  //         console.log('paymentObj', paymentObj);
  //
  //         localStorage.setItem(Constants.GUEST_KEY + 'paymentObjKey', JSON.stringify(paymentObj));
  //
  //         window.location.href = '#/payment-status';
  //
  //         ravePay.close();
  //
  //       }
  //       else {
  //         // redirect to a failure page.
  //       }
  //
  //       // this.ravePay.close(); // use this to close the modal immediately after payment.
  //     }
  //   });
  // }

  setServices(category: any): void {
    this.services = category.serviceResponses.filter(service => service.meta.guestUrl !== null);
    if (this.form) {
      this.form.reset();
      // Object.entries(this.form.controls).forEach(
      //   ([key, value]) => this.form.removeControl(key)
      // );
    }
  }

  prepareServiceForm(): void {
    const holdFields = [];
    this.service.meta.fields.forEach(field => {
      holdFields.push(new ServiceFormBase(field));
    });
    this.fields = holdFields;
    this.form = this.sharedService.toFormGroup(this.fields);
  }

  submitServiceData(e: Event): void {
    this.isLoading = true;
    const {hasConfirmation, guestUrl, confirmationUrl} = this.service.meta;
    const payload = {
      lat: 0,
      lga: '',
      lng: 0,
      packageId: this.servicePackage,
      state: ''
    };
    if (hasConfirmation) {
      this.anonymousService.performService(this.anonymousService.cleanUrl(confirmationUrl, 'kojeh-v2/api/'),
        this.anonymousService.cleanUrl(guestUrl, 'kojeh-v2/api/'), {...payload, ...e}, false).subscribe(res => {
        console.log(res);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
    }
  }
}
