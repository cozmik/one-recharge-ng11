import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../../../core/mocks/user/user.model';

@Component({
  selector: 'app-fund-agents',
  templateUrl: './fund-agents.component.html',
  styleUrls: ['./fund-agents.component.scss']
})
export class FundAgentsComponent implements OnInit {
  userData: any;

  userId: number;

  itemsPerPage: any;
  public totalPages: number;
  public isLoadingData;
  public itemsPerView = 10;
  public page: number;
  public status: number;
  public totalElements: number;
  public searchTerm = new Subject<string>();
  public searchText: string;

  p = 1;


  public agentWithId = [];

  public pageSize: any;
  public firstname = '';
  public lastname = '';
  public walletBalance = 0;
  public isBlocked: boolean;
  public agents = [];
  public isloading: boolean;
  public isLoadingAgents: boolean;
  private errorResponse: any;
  public fundedMessage: string;
  private searchInput: string;
  pageTitle = 'Fund Agents';

  dialogRef: MatDialogRef<fundDialogComponent>;
  selectedOption: string;


  constructor( public dialog: MatDialog, private agentService: UserService, private router: Router,
               private authService: AuthService, private error: ErrorService, private sharedService: SharedService,
               private toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.isLoadingAgents = false;
    this.fundedMessage = '';
    this.searchInput = '';
    this.itemsPerView = 10;
    this.pageSize = '10';
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
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllAgents, err);
        console.log(this.errorResponse);
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
      agentData.push(new User(agent));
    }
    this.agents = agentData;
    console.log('####');
    console.log(this.agents);
  }

  ////////////////// get all agents info ////////////////////////////////////////////////////
  getAllAgents = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingAgents = true;
    } else {
      this.isLoadingAgents = false;
    }

    this.agentService.getAgents(undefined, 0, this.itemsPerView, this.searchText).subscribe(
      (response: any ) => {
        console.log('**', response);
        this.processPagedData(response.data[0]);
        this.isLoadingAgents = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllAgents, err);
        this.isLoadingAgents = false;
        console.log(this.errorResponse);

      }
    );
  }


  fundDialog(userData: any): void {
    console.log('userdata', userData);

    const dialogRef = this.dialog.open(fundDialogComponent, {
      height: '280px',
      width: '400px',
      data: {
        userId: userData.id,
        walletBalance: userData.walletBalance,
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close'){
        return false;
      }
      const message = result.firstname + '\'s wallet was credited with ₦' + result.amount + ' successfully';
      this.fundedMessage = message;
      this.toast.showSuccess(message, 'Wallet Credited');
      this.getAllAgents(false);
    });

    if (this.fundedMessage  !==  ''){
      console.log('not empty');
    }
  }
}


@Component({
  selector: 'dialog-result',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;}',
    '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}',
    '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;} background-color:#ededed;' +
    ' display:inline-block; }'],
  templateUrl: './dialog-result.html',
})
export class fundDialogComponent {

  public firstName: string;
  public lastName: string;
  public userId: number;
  public walletBalance: number;
  public amount: number;
  public fundText: string;
  public isFunding: boolean;


  constructor(
    public dialogRef: MatDialogRef<fundDialogComponent>, private agentService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userId = this.data.userId;
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.walletBalance = this.data.walletBalance;
    this.amount = null;

    this.fundText = 'Fund Wallet';
    this.isFunding = false;
  }




  fundAgent = () => {

    const fundMessage = {funded: false, amount: 0, firstname : ''};
    this.fundText = 'Funding....';
    this.isFunding = true;

    this.agentService.fundWallet(this.userId, this.amount).subscribe(
      data => {
        fundMessage.funded = true;
        fundMessage.amount = this.amount;
        fundMessage.firstname = this.firstName;
        this.fundText = 'Fund Wallet';
        this.isFunding = false;

        this.dialogRef.close(fundMessage);
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.fundAgent, err);
      }
    );
  }


}
