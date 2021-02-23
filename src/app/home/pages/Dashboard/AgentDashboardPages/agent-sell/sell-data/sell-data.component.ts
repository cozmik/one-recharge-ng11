import {Component, OnInit, ViewChild} from '@angular/core';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import {Constants} from '../../../../../../shared/Constants';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MobileNetworks} from '../../../../../../shared/mobile-networks';
import {TransactionsResponse} from '../../../../../../core/mocks/transactionsResponse.model';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


declare var window: any;

@Component({
  selector: 'app-sell-data',
  templateUrl: './sell-data.component.html',
  styleUrls: ['./sell-data.component.scss']
})
export class SellDataComponent implements OnInit {

  public dataForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';
  @ViewChild(FormGroupDirective) dataFormVC;

  public networksDataWithId = [];
  public networkDataPackages = [];
  public networksLogoPath: any = [];
  public setId = null;
  public isVerifyDetails: boolean;
  public networks: any;
  public isloading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public userType: string;
  public isRecharging: boolean;
  public switchState: string;

  public isCommissionWallet = false;
  public dataResponse: any;

  public selectedNetwork: string;
  public amount: number;
  public mobile: number;
  public network: any;

  getpaidSetup: any;
  ravePay: any;
  transactionID: string;

  public productDetails: any;
  public productName: string;
  public product: any;

  public wallet: any = {
    walletBalance : 0,
    walletCommissionBalance : 0,
    actualWalletBalance : 0
  };


  public dataObj: any = {
    fromWallet: '',
    networkId: 0,
    productId: 0,
    receiverMsisdn: ''
  };

  constructor( public sharedService: SharedService, public anonymousService: AnonymousService,
               public snackBar: MatSnackBar,
               public error: ErrorService,
               public agent: UserService,
               public authService: AuthService, public fb: FormBuilder, public errorService: ErrorService,
               public toast: ToastService, public router: Router) {
    this.isLoadingNetworks = false;
    this.isVerifyDetails = false;

    this.switchState = 'data';

    this.networks = [];
    this.networksLogoPath = MobileNetworks.networksLogoPath;
    this.isloading = false;
    this.createForm();

    sharedService.walletAccountsEmitted$.subscribe(
      obj => {
        console.log(obj);
        console.log('obj.walletAccounts.walletBalance', obj.walletAccounts.walletBalance);
        this.wallet.walletBalance = obj.walletAccounts.walletBalance;
        this.wallet.walletCommissionBalance = obj.walletAccounts.walletCommissionBalance;
      });

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

    this.networks.sort ( (a, b) => {
      return - ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
    });

    for (let i = 0; i < this.networks.length; i++ ) {
      const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
      sortedNetworks.id = i + 1;
      sortedNetworks.logoPath = this.networksLogoPath[this.networks[i].networkCodeName];
      sortedNetworks.data = this.networks[i];
      this.networksDataWithId.push(sortedNetworks);
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

  setPackage(packageId: any): void {
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

        this.isLoadingNetworks = false;
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

  confirmData = () => {
    this.isRecharging = true;
    this.dataObj.fromWallet = this.isCommissionWallet ? Constants.COMMISSION_WALLET : Constants.MAIN_WALLET;
    console.log(this.dataObj);

    this.agent.dataRecharge(this.dataObj).subscribe(
      response => {
        this.resetForm(true);
        console.log(response);
        console.log('response data');
        this.sharedService.emitWalletAccounts();
        // this.resetForm();

        this.dataResponse = new TransactionsResponse(response.data[0]);
        console.log(this.dataResponse);
        if (this.dataResponse.status === 1){
          this.goToPage('data-success');
        }
        else if (this.dataResponse.status === 0){
          console.log('failed');
          this.goToPage('data-failed');
        }
        else if (this.dataResponse.status === -1){
          this.goToPage('data-pending');
        }

        this.isRecharging = false;

      },
      err => {
        console.log('error is here');
        console.log(err);
        const errorMessage = this.error.errorHandlerWithText(this.confirmData, err).message;
        this.toast.showError(errorMessage, 'Error');
        this.isRecharging = false;

      }
    );
  }

  checkNum(): void {
    if (this.dataForm.value.mobile &&   this.dataForm.value.mobile.length  !==  11) {
      this.dataForm.controls.mobile.setErrors({numberValid: true});
    }
  }

  resetForm(external = false): boolean{
    if (external){
      this.network = null;
      this.mobile = null;
      this.amount = null;
      return false;
    }
    this.dataFormVC.resetForm();
    this.dataFormVC.form.markAsPristine();
    this.dataFormVC.form.markAsUntouched();
    this.dataFormVC.form.updateValueAndValidity();
  }


  //
  backToStart(): void{
    this.isVerifyDetails = false;
  }
  //

  // Submit data form
  onSubmit(): void {
    this.isloading = true;
    this.dataObj.networkId = this.network;
    this.dataObj.productId = this.product;
    this.dataObj.receiverMsisdn = this.mobile;
    this.dataObj.amount = this.productDetails.amount;
    this.dataObj.networkName = this.getNetworkName(this.network);


    // this.generateTransactionId();
    this.switchState = 'data-verify';
    console.log('data Request', this.dataFormVC.value);
    console.log('data dataObj', this.dataObj);
  }

  toggleWallet(): void {
    this.isCommissionWallet = !this.isCommissionWallet;
    console.log(this.isCommissionWallet);
  }

  //
  ngOnInit(): void {
    this.getAllDataNetworks();
    this.sharedService.emitWalletAccounts();
  }

  goToPage(page: string = 'data'): void {
    this.switchState = page;
  }


}
