import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-sell-airtime',
  templateUrl: './sell-airtime.component.html',
  styleUrls: ['./sell-airtime.component.scss']
})
export class SellAirtimeComponent implements OnInit {


  public airtimeForm: FormGroup;
  public bulkForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';
  @ViewChild(FormGroupDirective) airtimeFormVC;

  @ViewChild(FormGroupDirective) bulkFormVC;

  @ViewChild('excel') inputEl: ElementRef;

  public networksWithId = [];
  public networksLogoPath: any = [];
  public setId = null;
  public switchState: string;
  public networks: any;
  public isloading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public isRecharging: boolean;
  public isCommissionWallet = false;
  public rechargeResponse: any;
  public requestSuccessful: boolean;

  public selectedNetwork: string;
  public amount: number;
  public mobile: number;
  public network: any;

  public wallet: any = {
    walletBalance : 0,
    walletCommissionBalance : 0,
    actualWalletBalance : 0
  };

  public rechargeObj: any = {
    amount: 0,
    fromWallet: '',
    networkId: 0,
    receiverMsisdn: '',
    networkName: ''
  };

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public fb: FormBuilder, public agent: UserService, public toast: ToastService,
              public storage: StorageService) {

    // this.sharedService.userWallet.subscribe(this.getWallet);
    this.isLoadingNetworks = false;
    this.switchState = 'recharge';

    this.networks = [];
    this.networksLogoPath = MobileNetworks.networksLogoPath;
    this.isloading = false;
    this.isRecharging = false;
    this.requestSuccessful = false;
    this.createForm();

    sharedService.walletAccountsEmitted$.subscribe(
      obj => {
        console.log(obj);
        // this.DashboardStatistics.walletBalance = obj.walletAccounts.walletBalance;
        this.wallet.walletCommissionBalance = obj.walletAccounts.walletCommissionBalance;
      });

  }

  createForm(): void {
    this.airtimeForm = this.fb.group({
      amount: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      networkId: ['', [Validators.required]],
    });
  }

  setNetwork(id: any): void{
    const networkName = this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
    this.selectedNetwork = networkName;
  //  console.log(networkName);
  }

  getNetworkName(id: any): void{
    return this.networksWithId.filter((network) =>  network.data.id === id)[0].data.networkName;
  }


  checkNum(): void {
    if (this.airtimeForm.value.mobile !== null && this.airtimeForm.value.mobile.length  !==  11) {
      this.airtimeForm.controls.mobile.setErrors({numberValid: true});
    }
  }

  resetForm(external = false): boolean{
    if (external){
      this.network = null;
      this.mobile = null;
      this.amount = null;
      return false;
    }
    this.airtimeFormVC.resetForm();
    this.airtimeFormVC.form.markAsPristine();
    this.airtimeFormVC.form.markAsUntouched();
    this.airtimeFormVC.form.updateValueAndValidity();
  }


  goToPage(page: string = 'recharge'): void{
    this.switchState = page;
  }

  // ////////////////// get all networks info ////////////////////////////////////////////////////
  getAllNetworks = () => {
    this.isLoadingNetworks = true;
    this.anonymousService.getNetworks().subscribe(
      response => {
        console.log('************ Networks list ****************');
        console.log(response.data);
        this.networks = response.data.filter((res) => res.isAirtimeActive);
        this.isLoadingNetworks = false;
        this.getNetworksWithId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllNetworks, err);
        this.isLoadingNetworks = false;
        console.log(this.errorResponse);

      }
    );
  }
  //// Sort data ////////////////////
  getNetworksWithId(): any {
    this.networksWithId = [];

    this.networks.sort((a, b) => {
      return - ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
    });

    for (let i = 0; i < this.networks.length; i++ ) {
      const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
      sortedNetworks.id = i + 1;
      sortedNetworks.logoPath = this.networksLogoPath[this.networks[i].networkCodeName];
      sortedNetworks.data = this.networks[i];
      this.networksWithId.push(sortedNetworks);
      this.isLoadingNetworks = false;
    }
    console.log('************ Networks with id ****************');
    console.log(this.networksWithId);
  }

  // Submit recharge form
  onSubmit(): void {
    this.isloading = true;
    this.rechargeObj.networkId = this.network;
    this.rechargeObj.receiverMsisdn = this.mobile;
    this.rechargeObj.amount = this.amount;
    this.rechargeObj.networkName = this.getNetworkName(this.network);

    this.switchState = 'recharge-verify';
    console.log('recharge Request', this.airtimeFormVC.value);
    console.log('recharge rechargeObj', this.rechargeObj);

    // console.log(this._airtimeForm.value);
    // console.log(this.selectedNetwork);
    // this.createText = 'Creating Admin...';
    // this.airtimeForm.disable();
    // this.createUser();
  }

  // updateWallet = () => {
  //   console.log('update wallet');
  //   this.sharedService.getWalletAccounts((obj) => {});
  // }

  confirmRecharge = () => {
    this.isRecharging = true;
    this.rechargeObj.fromWallet = this.isCommissionWallet ? Constants.COMMISSION_WALLET : Constants.MAIN_WALLET;
    console.log(this.rechargeObj);

    this.agent.airtimeRecharge(this.rechargeObj).subscribe(
      response => {
        this.resetForm(true);
        console.log(response);
        console.log('response data');
        this.sharedService.emitWalletAccounts();

        this.rechargeResponse = new TransactionsResponse(response.data[0]);
        console.log(this.rechargeResponse);
        if (this.rechargeResponse.status === 1){
          this.goToPage('recharge-success');
        }
        else if (this.rechargeResponse.status === 0){
          console.log('failed');
          this.goToPage('recharge-failed');
        }
        else if (this.rechargeResponse.status === -1){
          this.goToPage('recharge-pending');
        }

        this.isRecharging = false;

      },
      err => {
        console.log('error is here');
        console.log(err);
        const errorMessage = this.error.errorHandlerWithText(this.confirmRecharge, err).message;
        this.toast.showError(errorMessage, 'Error');
        this.isRecharging = false;

      }
    );
  }


  onSubmitFIle = () => {
    this.isloading = true;
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;

    if (inputEl.files.item(0)  !==  null) {


      const fileCount: any = inputEl.files.item(0);
      // console.log('file', inputEl);
      const formData = new FormData();

      // console.log('started');

      formData.append('rechargeFile', inputEl.files.item(0));
      this.agent.bulkAirtimeRecharge(formData).subscribe(
        response => {
          this.requestSuccessful = true;
          this.toast.showSuccess('you will be notified shortly', 'upload successful');
         // console.log('success');
         // const result = response.data[0];
        //  console.log(result);

          this.isloading = false;
        },
        error => {
          this.isloading = false;
        //  console.log(error);
          const msg = this.error.errorHandlerWithText(this.onSubmitFIle, error);
         // console.log(msg);
          this.toast.showError(msg.message, 'Error');
        }
      );
    } else {
     // this.toast.showError('No file Selected', 'Error');
      // this._bulkForm.resetForm();
    }
  }


  newTransaction(): void{
    this.router.navigate(['/agent/sell']);
  }


  toggleWallet(): void {
    this.isCommissionWallet = !this.isCommissionWallet;
  //  console.log(this.isCommissionWallet);
  }

  ngOnInit(): void {
    this.sharedService.emitWalletAccounts();

    this.getAllNetworks();
  }


}
