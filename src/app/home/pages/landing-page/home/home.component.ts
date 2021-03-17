import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../core/services/shared-service/shared.service';
import {Constants} from '../../../../shared/Constants';
import {AnonymousService} from '../../../../core/services/anonymous-service';
import {AuthService} from '../../../../core/authentication/auth-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ErrorService} from '../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../shared/services/toast-service/toast.service';
import {MobileNetworks} from '../../../../shared/mobile-networks';
import {Router} from '@angular/router';
import {ServiceStoreService} from '../../Dashboard/AdminDashboardPages/service-management/store/service-store.service';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public airtimeForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  public networksWithId = [];
  public networksLogoPath: any = [];
  public setId = null;
  public isVerifyDetails: boolean;
  public networks: any;
  public isloading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public selectedNetwork: string;
  public userType: string;
  public selectedService = 'mobileRecharge';
  public defaultService = 'airtime';
  ravePay: any;
  transactionID: string;
  public amount: number;
  public mobile: number;

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService,
              public error: ErrorService, public authService: AuthService, public fb: FormBuilder,
              public toast: ToastService, public router: Router, private smStore: ServiceStoreService) {
    this.isLoadingNetworks = false;
    this.isVerifyDetails = false;

    this.networks = [];
    this.networksLogoPath = MobileNetworks.networksLogoPath;
    this.isloading = false;
    // this.createForm();
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
  // }

  //
  setNetwork(id: any): void{
    this.selectedNetwork = this.networksWithId.filter((network) => network.data.id === id)[0].data.networkName;
    // console.log(networkName);
  }
  //

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  // private getAllNetworks = () => {
  //   this.anonymousService.getNetworks().subscribe(
  //     response => {
  //       this.networks = response.data;
  //       this.getNetworksWithId();
  //     },
  //     err => {
  //       this.errorResponse = this.error.errorHandlerWithText(this.getAllNetworks, err);
  //       this.isLoadingNetworks = false;
  //     }
  //   )
  // };

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  private generateTransactionId = () => {
    this.anonymousService.generateTransactionId().subscribe(
      response => {
        this.transactionID = response.data[0].transactionId;
      },
      err => {
        this.errorResponse = this.error.errorHandlerWithText(this.generateTransactionId, err);

      }
    );
  }

  checkNum(): void {
      if (this.airtimeForm.value.mobile.length  !==  11) {
        this.airtimeForm.controls.mobile.setErrors({numberValid: true});
      }
  }

  isNumber(): boolean {
    if ((typeof this.airtimeForm.value.mobile === 'number')) {
      return false;
    }
  }

  resetForm(): void{
    this.airtimeForm.reset();
    this.airtimeForm.markAsPristine();
    this.airtimeForm.markAsUntouched();
    this.airtimeForm.updateValueAndValidity();
  }

  //
  backToStart(): void {
    this.isVerifyDetails = false;
  }
  //
  //
  // Submit create Admin form
  onSubmit(): void{
    this.isloading = true;
    this.isVerifyDetails = true;
    // this.createText = 'Creating Admin...';
    // this.airtimeForm.disable();
    // this.createUser();
  }
  //
  ngOnInit(): void {
    this.isActiveUser();
    // this.getAllNetworks();
    // this.generateTransactionId();
  }

  //
  //
  //
  public payWithRave(): void {

    this.ravePay = window.getpaidSetup({
      PBFPubKey: 'FLWPUBK-b221de926958a7f4af45e7e80e1d23a0-X',
  //    customer_email: 'user@example.com',
      customer_email: Constants.SUPPORT_EMAIL,
      amount: this.amount,
      customer_phone: this.mobile,
      currency: 'NGN',
      payment_method: 'both',
      txref: this.transactionID,
      meta: [{
        metaname: 'flightID',
        metavalue: 'AP1234'
      }],
      onclose(): void {},
      callback(response): void {
        const txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        console.log('txref ', txref);
        console.log('This is the response returned after a charge', response);
        if (
          response.tx.chargeResponseCode === '00' ||
          response.tx.chargeResponseCode === '0'
        ) {
          // redirect to a success page
        } else {
          // redirect to a failure page.
        }

        this.ravePay.close(); // use this to close the modal immediately after payment.
      }
    });
  }

   isActiveUser = () => {
     if (localStorage.getItem(Constants.PROFILE)  !==  null){

       const profile = JSON.parse(localStorage.getItem(Constants.PROFILE));
       console.log(profile);

       this.userType = profile.userType;

       // check storage userType and redirect where needed;
       if (this.userType === Constants.ADMIN_USERTYPE){
         this.router.navigate(['/admin/dashboard']);
       }
       else if (this.userType === Constants.AGENT_USERTYPE){
         this.router.navigate(['/agent']);
       }
       else if (this.userType === Constants.CUSTOMER_USERTYPE){
         this.router.navigate(['/customer']);
       }
     }
     else{
       return false;
     }
  }

  public navigate(): void {
    if (this.userType === 'ADMIN'){
      this.router.navigate([Constants.ADMIN_DASHBOARD]);
    }
    else if (this.userType === 'AGENT'){
      this.router.navigate([Constants.AGENT_DASHBOARD]);
    }
    else if (this.userType === 'CUSTOMER'){
      this.router.navigate([Constants.CUSTOMER_DASHBOARD]);
    }

  }

  gotoRoute(defaultService: string): void {
    this.router.navigate(['/' + defaultService]);
  }

  selectRecentService(e: any): void {
    const servCat = this.smStore.allCategories.filter(c => c.id === e.data.serviceCategory.id)[0];
    this.anonymousService.dynamicFormCategory.next({category: servCat});
    setTimeout(() => {
      this.anonymousService.dynamicFormService.next({service: e.data});
    }, 100);
  }
}
