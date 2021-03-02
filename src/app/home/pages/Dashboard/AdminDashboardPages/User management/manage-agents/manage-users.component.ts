import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import '../../../../../../shared/components/custom-alert/custom-alert.component';
import {Agent} from '../../../../../../core/mocks/user/agent.model';
import {User} from '../../../../../../core/mocks/user/user.model';
import {Constants} from '../../../../../../shared/Constants';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['../../../../../../core/shared/custom-card.scss', './manage-users.component.scss']
})

export class ManageUsersComponent implements OnInit {
  userData: any;

  userId: number;

  itemsPerPage: any;
  public totalPages: number;
  public itemsPerView = 10;
  public page: number;
  public status: number;
  public totalElements: number;
  public searchTerm = new Subject<string>();
  public searchText: string;


  public agentWithId = [];
  public newAgentWithId = [];

  public setId = null;
  public firstname = '';
  public lastname = '';
  public walletBalance = 0;
  public isBlocked: boolean;
  public isFreezed: boolean;
  public agents = [];
  public isloading: boolean;
  public isLoadingAgents: boolean;
  private errorResponse: any;
  public fundedMessage: string;
  private searchInput: string;

  public isActiveTicked: boolean;
  public isBlockedTicked: boolean;

  private loggedInUser: User | Agent | any;

  pageTitle = 'Manage Users';

  dialogRef: MatDialogRef<DialogResultComponent>;


  constructor(public dialog: MatDialog, private agentService: UserService, private router: Router,
              private authService: AuthService, private error: ErrorService, private sharedService: SharedService,
              private toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.isLoadingAgents = false;
    this.fundedMessage = '';
    this.searchInput = '';
    this.itemsPerView = 10;


    this.isActiveTicked = true;
    this.isBlockedTicked = true;
    this.loggedInUser = new User(JSON.parse(localStorage.getItem(Constants.PROFILE)));
    this.userId = this.loggedInUser.userType === Constants.AGENT_USERTYPE ? this.loggedInUser.id : undefined;
  }

  ngOnInit(): void {
    this.getAllAgents(true);

    this.searchTerm.pipe(debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.searchText = search;
        this.getPaginatedData(1);
      });
  }

  filterData = (value: string) => {
    this.searchTerm.next(value.trim());
  }


// get agent id
  getUserDetails(userId, userStatus, walletBalance, firstName, lastName): void {
    this.setId = userId;
    this.isBlocked = userStatus;
    this.walletBalance = walletBalance;
    this.firstname = firstName;
    this.lastname = lastName;
  }

// view profile
  viewProfile(id?: number): void {
    console.log('********', id);
    if (id){
      if (this.loggedInUser.userType === Constants.ADMIN_USERTYPE) {
        this.router.navigate(['admin/agent/' + id + '/account' ]);
        return;
      }
      else if (this.loggedInUser.userType === Constants.AGENT_USERTYPE ){
        this.router.navigate(['agent/user/' + id + '/account' ]);
        return;
      }
    }
    this.router.navigate(['admin/agent/' + this.setId + '/account' ]);
  }

  // View Agents
  viewUserAgents(): void {
    this.router.navigate(['admin/agent/' + this.setId + '/user-agents']);
  }


// block user
  blockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log('Block user:' + userId);
    this.agentService.blockUser(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllAgents(false);
        this.isloading = false;
        this.toast.showSuccess('Agent  blocked successfully', 'Success');
      },
      err => {
        console.log(err);
        this.toast.showError(err, 'Error');
      }
    );
  }


// unblock user
  unBlockUser = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log('Block user:' + userId);
    this.agentService.unblockUser(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllAgents(false);
        this.isloading = false;
        this.toast.showSuccess('Agent unblocked successfully', 'Success');
      },
      err => {
        console.log(err);
        this.toast.showError(err, 'Error');
      }
    );
  }


  confirmDelete = () => {
    const deleteAction = confirm('Are you sure you want to delete this Agent ?');
    if (deleteAction) {
      this.deleteUser();
    }
  }

// delete agent
  deleteUser = () => {

    this.isloading = true;
    const userId = this.setId;
    console.log(`Delete user:${userId}`);
    this.agentService.deleteUser(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllAgents(false);
        this.isloading = false;
        this.toast.showSuccess('Agent Successfully Deleted', 'Success');
      },
      err => {
        console.log(err);
        this.toast.showError(err, 'Error');
      }
    );
  }


  getPaginatedData = (page: number) => {
    console.log('page : ' + page);
    this.page = page;
    this.agentService.getAgents(undefined, (this.page - 1), this.itemsPerView, this.searchText).subscribe(
      (response: any) => {
        console.log('response', response);
        this.processPagedData(response.data[0]);
        this.isLoadingAgents = false;
      },
      err => {
        this.isLoadingAgents = false;
      });
  }

  processPagedData(data): void {

    console.log('data', data);

    // itemsPerPage: , currentPage: , totalItems:
    const agentData = [];
    this.itemsPerPage = this.itemsPerView; // item per page
    this.totalPages = data.totalPages; // item per page
    this.totalElements = data.totalElements;
    this.page = data.number + 1;
    for (const agent of data.content) {
      agentData.push(new Agent(agent));
    }
    this.agents = agentData;
    console.log('####');
    console.log(this.agents);
  }

  ////////////////// get all agents info ////////////////////////////////////////////////////
  getAllAgents = (newLoad = false) => {
    this.isLoadingAgents = newLoad;

    this.agentService.getAgents(undefined, 0, this.itemsPerView, this.searchText).subscribe(
      (response: any) => {
        console.log('**', response);
        this.processPagedData(response.data[0]);
        this.isLoadingAgents = false;
      },
      err => {
        console.log(err);
        this.isLoadingAgents = false;
        console.log(this.errorResponse);

      }
    );
  }

  getAgentData(data: any): void {
    this.userData = data;
    this.setId = data.id;
    this.isBlocked = data.blocked;
    this.isFreezed = data.freezedAmount > 0;
  }

  fundDialog(): void {
    // console.log('userdata', this.userData);

    const dialogRef = this.dialog.open(DialogResultComponent, {
      height: '280px',
      width: '400px',
      data: {
        userId: this.userData.id,
        walletBalance: this.userData.walletBalance,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close') {
        return false;
      }
      const message = result.firstname + '\'s wallet was credited with ₦' + result.amount + ' successfully';
      this.fundedMessage = message;
      this.toast.showSuccess(message, 'Wallet Credited');
      this.getAllAgents(false);
    });

    if (this.fundedMessage !== '') {
      console.log('not empty');
    }
  }

  freezeDialog(): void {
    console.log('userdata', this.userData);

    const dialogRef = this.dialog.open(FreezeAccountComponent, {
      // height: '280px',
      width: '400px',
      data: {
        userId: this.userData.id,
        walletBalance: this.userData.walletBalance,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close') {
        return false;
      }
      const message = '₦' + result.freezeAmount + ' is frozen from ' + result.firstname + ' account successfully';
      this.fundedMessage = message;
      this.toast.showSuccess(message, 'Account Frozen');
      this.getAllAgents(false);
    });

    if (this.fundedMessage !== '') {
      console.log('not empty');
    }
  }
}


@Component({
  selector: 'dialog-result',
  styles: ['.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden;' +
  ' text-overflow: ellipsis; text-align: center;}' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;}' +
  ' background-color:#ededed; display: inline-block;} '],
  templateUrl: 'dialog-result.html',
})
export class DialogResultComponent {

  public firstName: string;
  public lastName: string;
  public userId: number;
  public walletBalance: number;
  public amount: number;
  public isFunding: boolean;


  constructor(
    public dialogRef: MatDialogRef<DialogResultComponent>, private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = this.data.userId;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.walletBalance = this.data.walletBalance;
    this.amount = null;
    this.isFunding = false;
  }


  fundAgent = () => {

    const fundMessage = {funded: false, amount: 0, firstname: ''};

    this.isFunding = true;
    this.agentService.fundWallet(this.userId, this.amount).subscribe(
      data => {

        fundMessage.funded = true;
        fundMessage.amount = this.amount;
        fundMessage.firstname = this.firstName;
        console.log(data);
        this.isFunding = false;
        this.dialogRef.close(fundMessage);
      },
      err => {
        console.log(err);
        this.isFunding = false;
        const msg = this.error.errorHandlerWithText(this.fundAgent, err);
      }
    );
  }


}


@Component({
  selector: 'freeze-account',
  styles: ['.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden;' +
  ' text-overflow: ellipsis; text-align: center;}' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;} background-color:#ededed; display: inline-block;} '],
  templateUrl: 'freeze-account.html',
})
export class FreezeAccountComponent {
  isFreezing: boolean;

  public firstName: string;
  public lastName: string;
  public userId: number;
  public walletBalance: number;

  public freezeAmount: number;
  public freezeReason: string;
  public freezeObj: any = {
    amount: null,
    reason: null,
    userId: null
  };


  constructor(
    public dialogRef: MatDialogRef<DialogResultComponent>, private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = this.data.userId;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.walletBalance = this.data.walletBalance;

    this.freezeAmount = null;
    this.freezeReason = null;

    this.isFreezing = false;
  }


  freezeAccount = () => {

    this.freezeObj.userId = this.userId;
    this.freezeObj.amount = this.freezeAmount;
    this.freezeObj.reason = this.freezeReason;
    this.isFreezing = true;

    console.log('freeze obj', this.freezeObj);


    const freezeMessage = {freezed: false, freezeAmount: 0, firstname: ''};

    this.agentService.freezeAccount(this.freezeObj).subscribe(
      data => {
        freezeMessage.freezed = true;
        freezeMessage.freezeAmount = this.freezeAmount;
        freezeMessage.firstname = this.firstName;

        this.isFreezing = false;
        console.log(data);
        this.dialogRef.close(freezeMessage);
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.freezeAccount, err);
      }
    );
  }


}
