import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-commission-accounts',
  templateUrl: './commission-accounts.component.html',
  styleUrls: ['./commission-accounts.component.scss']
})
export class CommissionAccountsComponent implements OnInit {

  p = 1;
  public accountsWithId = [];

  public setId = null;
  public isBlocked: boolean;
  public accounts: any;
  public isloading: boolean;
  public isLoadingAccounts: boolean;
  public errorResponse: any;
  pageTitle = 'Commission Accounts';

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;


  constructor(public userService: UserService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService) {
    this.isLoadingAccounts = false;
    this.sharedService.emitChange(this.pageTitle);
    this.getAllAccounts(true);
    this.accounts = [];
    this.isActiveTicked = true;
    this.isBlockedTicked = true;

  }

  ngOnInit(): void {
  }


  // Sort data ////////////////////
  getAccountsWithId(): void {
    this.accountsWithId = [];
    for (let i = 0; i < this.accounts.length; i++ ) {
      const sortedAgents: any = {id: 0, data: {}};
      sortedAgents.id = i + 1;
      sortedAgents.data = this.accounts[i];
      this.accountsWithId.push(sortedAgents);
      this.isLoadingAccounts = false;
    }
    console.log('************ Accounts with id ****************');
    console.log(this.accountsWithId);
  }


  ////////////////// get all accounts info ////////////////////////////////////////////////////
  getAllAccounts = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingAccounts = true;
    } else {
      this.isLoadingAccounts = false;
    }
    this.userService.getCommissionAccounts().subscribe(
      response => {
        console.log('************ Accounts list ****************');
        console.log(response.data);
        this.accounts = response.data.filter(accounts => accounts.deleted  !==  1);
        this.accounts.sort((a, b) => {
          return - ( b.name.localeCompare(a.name) );
        });
        this.getAccountsWithId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllAccounts, err);
        this.isLoadingAccounts = false;
        console.log(this.errorResponse);

      }
    );
  }

}
