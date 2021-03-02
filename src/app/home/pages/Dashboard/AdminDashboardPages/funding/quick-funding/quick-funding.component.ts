import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import '../../../../../../shared/components/custom-alert/custom-alert.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quick-funding',
  templateUrl: './quick-funding.component.html',
  styleUrls: ['./quick-funding.component.scss']
})
export class QuickFundingComponent implements OnInit {
  public switchCreate: boolean;
  public isloading: boolean;
  public uplodText: string;
  public agentType: string;
  public userDetails: any ;
  public userExists: any ;
  public agentsWithLowWallet: any;
  public isLoadingFromList: boolean;
  public fundStatus: boolean;
  walletBalance: number;
  p = 0;

  public agentId: any;
  public amount: number;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';
  public errorText: string;
  public searchData: any;
  public fundMessage: string;
  public userData: any = {
    id : null,
    fullName : null,
    email : null,
    phone : null,
    walletBalance : null
  };
  public fundingSuccessful: boolean;
  public isLoadingAgents: boolean;
  pageTitle = 'Fund Agent';


  constructor(public sharedService: SharedService, public anonymousService: AnonymousService,
              public authService: AuthService, public agentService: UserService,
              public router: Router, public snackBar: MatSnackBar, public fb: FormBuilder, public errorHandler: ErrorService,
              public toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.switchCreate = true;
    this.uplodText = 'Upload Agents';
    this.isloading = false;
    this.searchData = '';
    this.userDetails = null;
    this.errorText = '';
    this.userExists = false;
    this.fundingSuccessful = false;
    this.agentsWithLowWallet = '';
    this.isLoadingAgents = false;
    this.fundStatus = false;

    this.agentId = '';
    this.amount = null;

    this.userData.id =  '-';
    this.userData.fullName = '-';
    this.userData.email = '-';
    this.userData.phone = '-';
    this.userData.walletBalance = '-';
  }

  ngOnInit(): void {
    this.getAllAgents();
  }

  cancelAction = () => {
    if (this.userExists){
      this.searchData = '';
      this.userExists = false;
    }else{
      this.userExists = true;
    }
  }

  // search user
  searchUser = (searchEmail ?: string, isFromList: boolean = false) => {
    this.isloading = true;
    this.errorText = '';
    this.fundingSuccessful = false;
    this.amount = null;
    this.isLoadingFromList = isFromList;

    this.sharedService.checkUserExist(searchEmail ? searchEmail : this.searchData , this.searchData).subscribe(
      response => {

          this.userDetails = response;
          this.userExists = true;

          const {id, firstName, lastName, email, mobile, walletBalance} = this.userDetails;
          this.userData.id = id;
          this.userData.fullName =  firstName + ' ' + lastName;
          this.userData.email = email;
          this.userData.phone = mobile;
          this.userData.walletBalance = walletBalance;
          this.isloading = false;
          this.isLoadingFromList = false;
      }, err => {
        this.isloading = false;
        this.toast.showError(err, 'Error');
        this.isLoadingFromList = false;
        this.userData.id =  '-';
        this.userData.fullName =  '-';
        this.userData.email = '-';
        this.userData.phone = '-';
        this.userData.walletBalance = '-';
      });
  }


  fundAgent = (agentId: any, agentFullName: string) => {
    this.fundStatus = true;

    this.agentService.fundWallet(agentId, this.amount).subscribe(
      data => {
        this.getAllAgents();
        this.fundStatus = false;
        this.fundingSuccessful = true;
        this.fundMessage = agentFullName + ' wallet was credited with ₦' + this.amount + ' successfully';
      },
      err => {
        this.toast.showError(err, 'Error');
      }
    );
  }

  fundAnotherAgent = () => {
    this.fundingSuccessful = false;
    this.cancelAction();
  }

  // get list of all agents
  getAllAgents = () => {
    this.isLoadingAgents = true;
    this.agentService.getAgents(undefined, 0, 30).subscribe(
      response => {
        console.log('************ 10 Agents list ****************');
        const agentlist = response.data[0].content;
        console.log('********* agents ******');
        console.log(response.data);
        this.agentsWithLowWallet = agentlist.filter(agent => agent.walletBalance < 2000);
        console.log('********* agents less than 5k  ******');
        console.log(this.agentsWithLowWallet);
        this.isLoadingAgents = false;
      },
      err => {

        const error = this.errorHandler.errorHandlerWithText(this.getAllAgents, err);
        console.log('error', error);
       // this.toast.showError(error.message, 'Error');

      }
    );
  }
}
