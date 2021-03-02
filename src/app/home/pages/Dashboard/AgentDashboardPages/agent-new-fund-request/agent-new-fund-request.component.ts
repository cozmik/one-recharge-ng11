import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {Router} from '@angular/router';
import {Constants} from '../../../../../shared/Constants';
import {Agent} from '../../../../../core/mocks/agent/agent.model';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {FundRequests} from '../../../../../core/mocks/fundRequests.model';

@Component({
  selector: 'app-agent-new-fund-request',
  templateUrl: './agent-new-fund-request.component.html',
  styleUrls: ['./agent-new-fund-request.component.scss']
})
export class AgentNewFundRequestComponent implements OnInit {

  private pageTitle: string;
  public fundRequestForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  @ViewChild('proofOfPayment') proofOfPaymentRef: ElementRef;

  @ViewChild(FormGroupDirective) _fundRequestForm;

  public setId = null;
  public switchState: string;
  public paymentModes: any;
  public isloading: boolean;
  public isLoadingNetworks: boolean;
  public errorResponse: any;
  public isRequesting: boolean;
  public fundRequestObj: any = {
    paymentMode: '',
    referenceId: '',
    depositorName: '',
    amount: 0,
    paymentDate: '',
    proofOfPayment : ''
  };

  public proofOfPayment: any;

  public successfulFundRequest: any;

  public selectedNetwork: string;
  public amount: number;
  public mobile: number;
  public paymentMode: any;

  public wallet: any = {
    walletBalance : 0,
    walletCommissionBalance : 0,
    actualWalletBalance : 0
  };

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public fb: FormBuilder, public agent: UserService, public toast: ToastService) {

    this.pageTitle = 'New Fund Requests';
    this.sharedService.emitChange(this.pageTitle);

    // this.sharedService.userWallet.subscribe(this.getWallet);
    this.isLoadingNetworks = false;
    this.switchState = 'new';
    this.paymentModes = [];
    this.isloading = false;
    this.isRequesting = false;
    this.createForm();

  }


  createForm(): void{
    this.fundRequestForm = this.fb.group({
      paymentMode: ['', Validators.required],
      referenceId: ['', Validators.required],
      depositorName: ['', Validators.required],
      amount: ['', [Validators.required]],
      paymentDate: ['', Validators.required],
      proofOfPayment: ['', [Validators.required]],
    });
  }


  resetForm(): void{
    this.fundRequestObj.paymentMode = '';
    this.fundRequestObj.referenceId = '';
    this.fundRequestObj.depositorName = '';
    this.fundRequestObj.amount = 0;
    this.fundRequestObj.paymentDate = '';
    this.fundRequestObj.proofOfPayment = '';

    this.fundRequestForm.reset();
    this.fundRequestForm.markAsPristine();
    this.fundRequestForm.markAsUntouched();
    this.fundRequestForm.updateValueAndValidity();
  }

  goToPage(page: string = 'new'): void{
    this.createForm();
    this.switchState = page;
  }

  // ////////////////// get all payment Mode ////////////////////////////////////////////////////
  getPaymentModes = () => {
    this.anonymousService.getFundPaymentModes().subscribe(
      response => {
        this.paymentModes = response;
        this.filterPaymentMethods();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getPaymentModes, err);
        this.isLoadingNetworks = false;
      }
    );
  }


  filterPaymentMethods = () => {
    const  paymentModesHolder = [];
    this.paymentModes.forEach(ele => {
      paymentModesHolder.push(ele.replace(/[_-]/g, ' '));
    });

    this.paymentModes = [];
    this.paymentModes = paymentModesHolder;
  }

  // Submit recharge form
  onSubmit(): void {
    // const proofOfPayment: HTMLInputElement = this.PoP.nativeElement.files.item(0);
    this.fundRequestObj.amount = this.fundRequestForm.value.amount;
    this.fundRequestObj.paymentDate = this.fundRequestForm.value.paymentDate;
    this.fundRequestObj.depositorName = this.fundRequestForm.value.depositorName;
    this.fundRequestObj.paymentMode = this.fundRequestForm.value.paymentMode;
    this.fundRequestObj.referenceId = this.fundRequestForm.value.referenceId;
    this.fundRequestObj.proofOfPayment = this.fundRequestForm.value.proofOfPayment;

    this.switchState = 'verify';
    console.log('fund Request', this.fundRequestForm.value);
    console.log('fund fundRequestObj', this.fundRequestObj);
  }

  confirmRequest = () => {
    // this.fundRequestForm.disable();
    this.fundRequestForm.removeControl('proofOfPayment');
    this.isRequesting = true;
    const paymentDate = this.fundRequestForm.value.paymentDate;
    this.fundRequestForm.value.paymentDate = new Date(paymentDate).getTime();
    console.log('paymentDate', paymentDate);
    console.log('POP', this.proofOfPaymentRef);

   // const PoP: HTMLInputElement = this.proofOfPaymentRef.nativeElement;
    const formData = new FormData();

    console.log('PoP', this.proofOfPayment);
    formData.append('proofOfPayment', this.proofOfPayment);

    console.log(this.fundRequestForm.value);


    this.agent.requestFunding(this.fundRequestForm.value, formData).subscribe(
      response => {
        this.resetForm();
        console.log('response data');
        this.successfulFundRequest = new FundRequests(response);
        this.isRequesting = false;

        this.goToPage('success');
      },
      err => {
        console.log('error is here');
        console.log(err);
        // const errorResponse = this.error.errorHandlerWithText(this.confirmRequest, err);
        this.isRequesting = false;
      }
    );
  }

  newRecharge(): void{
    this.router.navigate(['/new-fund-request']);
  }

  fileEvent(e): void{
    this.proofOfPayment = e.target.files[0];
    console.log(e);
  }



  ngOnInit(): void {
    this.getPaymentModes();
  }


}
