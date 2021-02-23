import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {Constants} from '../../../../../shared/Constants';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {MobileNetworks} from '../../../../../shared/mobile-networks';
import {FlutterWaveResponse} from '../../../../../core/mocks/flutterwaveResponse.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var window: any;

@Component({
  selector: 'app-guest-data',
  templateUrl: './guest-data.component.html',
  styleUrls: ['./guest-data.component.scss']
})
export class GuestDataComponent implements OnInit {
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';
  @ViewChild(FormGroupDirective) dataForm;

  public networksDataWithId = [];
  public networkDataPackages = [];
  public networksLogoPath: any = [];
  public setId = null;
  public isVerifyDetails: boolean;
  public networks: any;
  public isLoading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public userType: string;
  public isRecharging: boolean;
  public switchState: string;

  ravePay: any;
  transactionID: string;

  public selectedNetwork: string;
  public productDetails: any;
  public productName: string;
  public mobile: number;
  public network: any;
  public product: any;
  public amount: number;


  public dataObj: any = {
      cardLast4Digit: '',
      networkId: 0,
      paymentId: 0,
      productId: 0,
      receiverMsisdn: '',
      status: 'string',
      transactionId: '',
      transactionRef: ''
  };

  constructor( public sharedService: SharedService,
               public anonymousService: AnonymousService,
               public snackBar: MatSnackBar,
               public error: ErrorService,
               public authService: AuthService,
               public fb: FormBuilder,
               public errorService: ErrorService,
               public toast: ToastService,
               public router: Router) {
    this.isLoadingNetworks = false;
    this.isVerifyDetails = false;

    this.switchState = 'data';

    this.networks = [];
    this.networksLogoPath = MobileNetworks.networksLogoPath;
    this.isLoading = false;
    this.createForm();

  }

  createForm(): void {
    this.dataForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      networkId: ['', [Validators.required]],
      product: ['', [Validators.required]]
    });
  }

  //// Sort data ////////////////////
  getNetworksDataWithId(): void {
    this.networksDataWithId = [];

    this.networks.sort((a, b) => {
      return - ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
    });

    for (let i = 0; i < this.networks.length; i++ ) {
      const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
      sortedNetworks.id = i + 1;
      sortedNetworks.logoPath = this.networksLogoPath[this.networks[i].networkCodeName];
      sortedNetworks.data = this.networks[i];
      this.networksDataWithId.push(sortedNetworks);
      this.isLoadingNetworks = false;
    }
    console.log('************ Networks with id ****************');
    console.log(this.networksDataWithId);
    localStorage.setItem('networks', JSON.stringify(this.networksDataWithId));
  }

  //
  setNetwork(networkId: any): void{
    const productObj = this.networksDataWithId.filter((network) =>  network.data.id === networkId);
    const networkName = productObj[0].data.networkName;
    this.amount = null;
    console.log('product name', networkName);

    console.log('product object', productObj);

    console.log(' product', productObj[0].data.products);

    this.selectedNetwork = networkName;
    // console.log('selectedNetwork', this.selectedNetwork);
    this.networkDataPackages = productObj[0].data.products;
    // console.log(networkName);
  }

  setPackage(packageId: any): void{
    this.productDetails = this.networkDataPackages.filter((packageData) =>  packageData.id === packageId)[0];
    console.log(this.productDetails);
    this.amount = this.productDetails.amount;
    this.productName = this.productDetails.name;
  }

  getNetworkName(id: any): void{
    return this.networksDataWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  private getAllDataNetworks = () => {
    this.isLoadingNetworks = true;
    this.anonymousService.getDataNetworks().subscribe(
      response => {
        console.log('************ Data Network list ****************');
        console.log(response.data);
        this.networks = response.data.filter((res) => res.isDataActive);
        this.getNetworksDataWithId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllDataNetworks, err);
        this.isLoadingNetworks = false;
        console.log(this.errorResponse);

      }
    );
  }

  private generateTransaction = () => {
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
    );
  }

  checkNum(): void {
    if (this.dataForm.value.mobile &&   this.dataForm.value.mobile.length  !==  11) {
      this.dataForm.controls.mobile.setErrors({numberValid: true});
    }
  }

  resetForm(): void{
    this.selectedNetwork = null;
    this.dataForm.reset();
    this.dataForm.markAsPristine();
    this.dataForm.markAsUntouched();
    this.dataForm.updateValueAndValidity();
  }

  // Submit data form
  onSubmit(): void {
    this.isLoading = true;
    this.dataObj.networkId = this.network;
    this.dataObj.productId = this.product;
    this.dataObj.receiverMsisdn = this.mobile;
    this.dataObj.amount = this.productDetails.amount;
    this.dataObj.networkName = this.getNetworkName(this.network);

    localStorage.setItem(Constants.GUEST_KEY + 'data' , JSON.stringify(this.dataObj));

    // this.generateTransactionId();
    this.switchState = 'data-verify';
    console.log('data Request', this.dataForm.value);
    console.log('data dataObj', this.dataObj);
  }

  //
  ngOnInit(): void {
    this.getAllDataNetworks();
  }

  goToPage(): void{
    this.switchState = 'data';
  }

  public payWithRave(): void {
    this.isRecharging = false;

    console.log('paying');

    const ravePay = window.getpaidSetup({
      PBFPubKey: Constants.CUSTOMER_GUEST_PAYMENT_KEY,
    //  customer_email: 'support@lillynaija.com',
      customer_email: Constants.SUPPORT_EMAIL,
      amount: this.dataObj.amount,
      customer_phone: this.dataObj.receiverMsisdn,
      currency: 'NGN',
      payment_method: 'both',
      txref: this.transactionID,
      meta: [{
        metaname: 'flightID',
        metavalue: 'AP1234'
      }],
      onclose(): void {
      },
      callback(response): void {
        const txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        // console.log('txref ', txref);
        // console.log('This is the response returned after a charge', response);
        const flutterResponse = new FlutterWaveResponse(response.data, response.name, response.success, response.tx);
        if ( response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0' )
        {
          // redirect to a success page

          const guestDataObj = {
            cardLast4Digit: '',
            networkId: 0,
            paymentId: 0,
            productId: 0,
            receiverMsisdn: '',
            status: '',
            transactionId: '',
            transactionRef: ''
          };

          const previousDataObj: any = JSON.parse(localStorage.getItem(Constants.GUEST_KEY + 'data'));

          guestDataObj.receiverMsisdn = previousDataObj.receiverMsisdn;
          guestDataObj.networkId = previousDataObj.networkId;
          guestDataObj.productId = previousDataObj.productId;
          guestDataObj.paymentId = flutterResponse.tx.paymentId;
          guestDataObj.transactionId = flutterResponse.tx.txRef;
          guestDataObj.status = flutterResponse.tx.status;

          const paymentObj = {
            payload : guestDataObj,
            type: 'data',
            homeUrl : '/',
            packageTransactionUrl : '',
            repeatTransactionUrl : ''
          };

          // console.log('paymentObj', paymentObj);

          localStorage.setItem(Constants.GUEST_KEY + 'paymentObjKey', JSON.stringify(paymentObj));

          window.location.href = '#/payment-status';

          ravePay.close();

        }
        else {
          // redirect to a failure page.
        }

        // this.ravePay.close(); // use this to close the modal immediately after payment.
      }
    });


  }


}
