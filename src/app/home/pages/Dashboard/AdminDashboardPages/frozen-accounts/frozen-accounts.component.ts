import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../../../core/authentication/auth-service.service';


@Component({
  selector: 'app-frozen-accounts',
  templateUrl: './frozen-accounts.component.html',
  styleUrls: ['./frozen-accounts.component.scss']
})
export class FrozenAccountsComponent implements OnInit {

  p = 1;


  public frozenAccountsWithId = [];
  public newAgentWithId = [];
  searchText: string;


  public pageSize: any;
  public firstname: string;
  public lastname = '';
  public walletBalance = 0;
  public isBlocked: boolean;
  public agents: any;
  public isloading: boolean;
  public isLoadingFrozenAccounts: boolean;
  private errorResponse: any;
  public fundedMessage: string;
  private searchInput: string;
  pageTitle = 'Frozen Accounts';

  dialogRef: MatDialogRef<detailsDialogComponent>;
  selectedOption: string;


  constructor( public dialog: MatDialog, private userService: UserService, private router: Router,
               private authService: AuthService, private error: ErrorService, private sharedService: SharedService,
               private toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.isLoadingFrozenAccounts = false;
    this.fundedMessage = '';
    this.searchInput = '';
    this.pageSize = '10';
    this.firstname = '';
    this.getAllAgents(true);
  }

  ngOnInit(): void {
  }


  ////////////////// get all agents info ////////////////////////////////////////////////////
  getAllAgents = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingFrozenAccounts = true;
    } else {
      this.isLoadingFrozenAccounts = false;
    }
    this.userService.getFrozenAccounts().subscribe(
      response => {
        console.log('************ Frozen accounts list ****************');
        console.log(response.data);
        this.agents = response.data;
        this.isLoadingFrozenAccounts = false;
        this.getAgentWithSortedId();
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllAgents, err);
        this.isLoadingFrozenAccounts = false;
        console.log(this.errorResponse);

      }
    );
  }


  // Sort data ////////////////////
  getAgentWithSortedId(): void {
    this.frozenAccountsWithId = [];
    this.agents.sort((a, b) => {
      return - ( a.id - b.id  ||  a.name.localeCompare(b.name) );
    });
    let i = 0;
    for (const agent of this.agents) {
      const sortedAgents: any = {id: 0, data: {}};
      i += 1;
      sortedAgents.id = i;
      sortedAgents.data = agent;
      this.frozenAccountsWithId.push(sortedAgents);
    }
    console.log(this.frozenAccountsWithId);
    this.isLoadingFrozenAccounts = false;
  }


  viewDialog(userObj: any): void {
    console.log('userdata', userObj);

    const dialogRef = this.dialog.open(detailsDialogComponent, {
      height: '400px',
      width: '500px',
      data: {
        userObj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close'){
        return false;
      }
    });
  }
}


@Component({
  selector: 'dialog-result',
  styles: [ `.user-details {
    text-decoration: none;
    list-style: none;
    color: #444;
  }

  .user-details tr {
    margin: 10px 0;
  }

  .user-details tr:nth-child(even) {
    background-color: #ecf0f5;
  }

  .user-details tr td:nth-child(1) {
    color: #444;
    font-weight: 400;
    width: 40%;
  }

  .detail {
    font-weight: 700;
    margin-top: 8px;
    width: 60%;
  }

  .title {
    font-weight: 400;
    margin-top: 8px;
    width: 40%;
    text-overflow: ellipsis;
  } `],
  templateUrl: './view-details.html',
})
export class detailsDialogComponent {

  public adminEmail: string;
  public adminFirstName: string;
  public adminLastName: string;
  public agentEmail: string;
  public agentFirstName: string;
  public agentLastName: string;
  public amount: number;
  public createdDate: string;
  public reason: string;
  public walletBalance: number;
  public status: number;
  public updatedDate: string;


  constructor(
    public dialogRef: MatDialogRef<detailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.adminEmail = this.data.userObj.adminEmail;
    this.adminFirstName = this.data.userObj.adminFirstName;
    this.adminLastName = this.data.userObj.adminLastName;
    this.agentEmail = this.data.userObj.agentEmail;
    this.agentFirstName = this.data.userObj.agentFirstName;
    this.amount = this.data.userObj.amount;
    this.createdDate = this.data.userObj.createdDate;
    this.reason = this.data.userObj.reason;
    this.status = this.data.userObj.status;
    this.updatedDate = this.data.userObj.updatedDate;
  }
}
