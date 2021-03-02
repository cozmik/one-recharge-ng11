import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../../../../../core/services/users-service/user-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {Constants} from '../../../../../../../shared/Constants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../../../core/services/error_service/error.service';
import '../../../../../../../shared/components/custom-alert/custom-alert.component';
import {MobileNetworks} from '../../../../../../../shared/mobile-networks';
import {AgentNetworkConfig, Config} from '../../../../../../../core/mocks/network/agent-network-config.model';
import {User} from '../../../../../../../core/mocks/user/user.model';
import {ServiceInterface, ServiceModel} from '../../../service-management/models/service.model';
import {ServiceStoreService} from '../../../service-management/store/service-store.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-account.component.html',
  styleUrls: ['./agent-account.component.scss']
})
export class AgentAccountComponent implements OnInit {

  public pageTitle: string;
  type: string;
  public isEdit: boolean;
  public viewInfo: boolean;
  public switchCreate: boolean;
  public roles: any;
  public userDataResponse: any;
  public message: any;
  public isNotEdit: boolean;
  public editText: string;
  public isloading: boolean;
  public recentAgentTransactions: any;
  public isLoadingrecentTransactions: boolean;
  public errorResponse: any;
  public userData: any;
  public blockingText: string;
  public userId: number;
  services: ServiceInterface[];
  public isBlocked: any;
  public networksLogoPath: any = [];
  public networkObj: any;
  public activeId: number;
  public agentCommission: number;
  public isConfigSaving: boolean;
  public loggedInUserType: User;

  public airtimeNetworkConfig = [];
  public loggedInUserAirtimeNetworkConfig: Config[] = [];
  public airtimeNetworkConfigWithId = [];
  public isLoadingAirtimeNetworkConfig: boolean;

  public dataNetworkConfig = [];
  public loggedInUserDataNetworkConfig: Config[] = [];
  public dataNetworkConfigWithId = [];
  public isLoadingDataNetworkConfig: boolean;

  p = 1;

  public setId = null;
  public isPersonalConfig = false;
  public isActive: boolean;

  public allLoading: any = {
    profile: true,
    transaction: true,
    roles: true
  };


  public userFormData: any = {
    roleId: '',
    mainWallet: '',
    commissionWallet: '',
    dateCreated: '',
    lastLogin: '',
    lastName: '',
    firstName: '',
    mobileNo: '',
    altMobileNo: '',
    email: '',
    address: '',
    blocked: ''
  };


  constructor(public sharedService: SharedService, public router: Router,
              public anonymousService: AnonymousService, public error: ErrorService,
              public agentService: UserService, public toast: ToastService,
              public activatedRoute: ActivatedRoute, public dialog: MatDialog,
              private smStore: ServiceStoreService
              ) {
    this.pageTitle = 'Account';
    this.sharedService.emitChange(this.pageTitle);

    this.activatedRoute.parent.params.subscribe(params => {
      this.userId = +params.id;
    });

      // console.log(typeof this.userId);

    this.isLoadingAirtimeNetworkConfig = false;
    this.isLoadingDataNetworkConfig = false;
    this.loggedInUserType = new User(JSON.parse(localStorage.getItem(Constants.PROFILE)));

    // console.log('userType : ' + this.loggedInUserType.agentTypeName.toLowerCase());
    // console.log('user : ', this.loggedInUserType);
    // console.log(this.loggedInUserType.agentTypeName.toLowerCase() === 'admin');

    this.userFormData.mainWallet = 0;
    this.userFormData.commissionWallet = 0;
    this.recentAgentTransactions = [];

    this.airtimeNetworkConfig = [];
    this.dataNetworkConfig = [];

    this.networksLogoPath = MobileNetworks.networksLogoPath;

    this.isloading = false;
    this.isLoadingrecentTransactions = true;
    this.getRoles();
    this.sharedService.emitChange(this.pageTitle);
    this.switchCreate = true;

    // Inverted the block logic to make colored button signify active //////////////////////////////
    this.isEdit = false;
    this.isNotEdit = true;
    this.editText = 'Edit Profile';
    this.viewInfo = true;
    this.getUser();
    this.activeId = null;
    this.isConfigSaving = false;

  }

  ngOnInit(): void {
    this.smStore.allServices.subscribe(serve => {
      const serveArr = [];
      serve.forEach(s => {
        serveArr.push(new ServiceModel(s));
      });
      this.services = serveArr;
    });
    if (this.loggedInUserType.agentTypeName.toLowerCase() === 'admin'){
      // this.getAirtimeNetworkConfig(true);
      // this.getDataNetworkConfig(true);
    }
    else{
      // this.getLoggedInUserAirtimeNetworkConfig();
      // this.getLoggedInUserDataNetworkConfig();
    }

    this.getRecentTransactions();

  }

  // get network details
  getNetworkDetails(networkObj: any, type: string): number {
    // console.log('networkObj', networkObj);
    this.setId = networkObj.id;
    this.isActive = networkObj.status;
    this.isPersonalConfig = networkObj.isPersonalConfig;

    this.networkObj = networkObj;
    this.type = type.toUpperCase();
    return this.setId;
  }

  //  Initialize form //////////////////////////////////////////
  public initializeForm(): void{
    const formData = this.userFormData;

    const profile = this.userData;
    formData.roleId = profile.role.id;
    formData.mainWallet = profile.walletBalance;
    formData.commissionWallet = profile.walletCommissionBalance;
    formData.dateCreated = profile.createdDate;
    formData.lastLogin = profile.lastLoginDate;
    formData.firstName = profile.firstName;
    formData.lastName = profile.lastName;
    formData.mobileNo = profile.mobile;
    formData.altMobileNo = profile.altMobileNo;
    formData.email = profile.email;
    formData.address = profile.address;
    formData.blocked = profile.disabled;
  }

  onSubmit(): void {
    this.updateUser();
  }

  // update users
  updateUser = () => {
    this.isloading = true;
    this.agentService.updateAgent(this.userFormData, this.userId).subscribe(
      data => {
        // console.log(data);
        if (data.status === 200) {
          this.userDataResponse = data;
          this.message = 'Agent\'s Profile updated successfully';
          this.toast.showSuccess(this.message, 'Success');
          this.getUser();
        }
        this.isloading = false;
        this.isNotEdit = true;
      },
      err => {
        // console.log(err);
        // const error = this.error.errorHandlerWithText(this.updateUser, err).message;
        // console.log('******* Error *******');
        // console.log(error);
        this.isloading = false;
        this.isNotEdit = false;
      }
    );
  }

  // get roles
  getRoles = () => {
    this.anonymousService.getRoles().subscribe(
      response => {
        // console.log('get roles function');
        // console.log(response.data);
        this.roles = response.data;

        this.allLoading.roles = false;
      },
      err => {
        // console.log(err);
        this.error.errorHandlerWithText(this.getRoles, err);
        // console.log(errMsg.message);
      }
    );
  }

  public getRecentTransactions = () => {
    this.anonymousService.getUserTransactions(this.userId).subscribe(
      response => {
        console.log('get user tranx');
        this.recentAgentTransactions = response.data[0].content;
        // console.log('******************* ******************************');
        // console.log(this.recentAgentTransactions);
        this.isLoadingrecentTransactions = false;

        this.allLoading.transaction = false;
      },
      err => {
        // console.log(err);
        this.isLoadingrecentTransactions = false;
        // this.error.errorHandlerWithText(this.getRecentTransactions, err);
      }
    );
  }

  getLoggedInUserAirtimeNetworkConfig = () => {
    this.agentService.getLoggedInUserAirtimeNetworkConfig().subscribe(
      response => {
        response.data.forEach(config => {
          const dConfig = new Config(config);
          this.loggedInUserAirtimeNetworkConfig.push(dConfig);
          this.getAirtimeNetworkConfig(true);
        });
        // console.log('getLoggedInUserAirtimeNetworkConfig', this.loggedInUserAirtimeNetworkConfig);
      },
      err => {
        // console.log(err);
        this.error.errorHandlerWithText(this.getLoggedInUserAirtimeNetworkConfig, err);
      }
    ); }

  getLoggedInUserDataNetworkConfig = () => {
    this.agentService.getLoggedInUserDataNetworkConfig().subscribe(
      response => {

        response.data.forEach(config => {
          this.loggedInUserDataNetworkConfig.push(config);
        });

        this.getDataNetworkConfig(true);

        // console.log(' loggedInUserDataNetworkConfig' , this.loggedInUserDataNetworkConfig);

      },
      err => {
        // console.log(err);
        this.error.errorHandlerWithText(this.getLoggedInUserDataNetworkConfig, err);
      }
    ); }

  ////////////////// get airtime networks config ////////////////////////////////////////////////////
  getAirtimeNetworkConfig = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingAirtimeNetworkConfig = true;
    } else {
      this.isLoadingAirtimeNetworkConfig = false;
    }

    this.agentService.getUserAirtimeNetworkConfig(this.userId).subscribe(
      response => {
        this.airtimeNetworkConfig = [];
        // console.log('************ Airtime network list ****************');

        const dAirtimeNetwork = new AgentNetworkConfig(response.data[0]);
        // console.log('dAirtimeNetwork', dAirtimeNetwork);

        this.isloading = false;

        dAirtimeNetwork.config.forEach(network => {
          this.airtimeNetworkConfig.push(network);
        });

        // console.log('**', this.airtimeNetworkConfig);

        /* filter the network */
        this.airtimeNetworkConfigWithId = [];

        this.airtimeNetworkConfig.sort ( (a, b) => {
          return ( a.network.id - b.network.id  ||  a.network.networkName.localeCompare(b.network.networkName) );
        });

        for (let i = 0; i < this.airtimeNetworkConfig.length; i++ ) {
          const sortedNetworks: any = {id: 0, logoPath: '', superAgentCommission: null, myCommission: null, data: {}};
          sortedNetworks.id = i + 1;
          sortedNetworks.logoPath = this.networksLogoPath[this.airtimeNetworkConfig[i].network.networkCodeName];
          sortedNetworks.superAgentCommission = dAirtimeNetwork.superConfig.filter(network =>
            network.networkId === this.airtimeNetworkConfig[i].networkId)[0];
          if ((this.loggedInUserType.agentTypeName.toLowerCase() === 'super agent')
            || (this.loggedInUserType.agentTypeName.toLowerCase() === 'sub super agent')){
            sortedNetworks.myCommission = this.loggedInUserAirtimeNetworkConfig.filter(network =>
              network.networkId === this.airtimeNetworkConfig[i].networkId);
          }
          sortedNetworks.data = this.airtimeNetworkConfig[i];
          this.airtimeNetworkConfigWithId.push(sortedNetworks);
          this.isLoadingAirtimeNetworkConfig = false;
        }
        // console.log('************  Airtime network  with id ****************');
        // console.log(this.airtimeNetworkConfigWithId);
      },
      err => {
        // console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeNetworkConfig, err);
        this.isLoadingAirtimeNetworkConfig = false;
        // console.log(this.errorResponse);

      }
    );
  }

  ////////////////// get data networks config ////////////////////////////////////////////////////
  getDataNetworkConfig = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingDataNetworkConfig = true;
    } else {
      this.isLoadingDataNetworkConfig = false;
    }

    this.agentService.getUserDataNetworkConfig(this.userId).subscribe(
      response => {
        this.dataNetworkConfig = [];
        console.log('************ Data network list ****************');

        const dDataNetwork = new AgentNetworkConfig(response.data[0]);

        dDataNetwork.config.forEach(network => {
          this.dataNetworkConfig.push(network);
        });

        this.isloading = false;

        console.log(this.dataNetworkConfig);

        /* filter the network */
        this.dataNetworkConfigWithId = [];

        this.dataNetworkConfig.sort ( (a, b) => {
          return ( a.network.id - b.network.id  ||  a.network.networkName.localeCompare(b.network.networkName) );
        });

        for (let i = 0; i < this.dataNetworkConfig.length; i++ ) {
          const sortedNetworks: any = {id: 0, logoPath: '', data: {}, superAgentCommission: null};
          sortedNetworks.id = i + 1;
          sortedNetworks.logoPath = this.networksLogoPath[this.dataNetworkConfig[i].network.networkCodeName];
          sortedNetworks.superAgentCommission = dDataNetwork.superConfig.filter(network =>
            network.networkId === this.dataNetworkConfig[i].networkId)[0];
          if ((this.loggedInUserType.agentTypeName.toLowerCase() === 'super agent')
            || (this.loggedInUserType.agentTypeName.toLowerCase() === 'sub super agent')){
            sortedNetworks.myCommission = this.loggedInUserDataNetworkConfig.filter(network =>
              network.networkId === this.dataNetworkConfig[i].networkId);
          }
          sortedNetworks.data = this.dataNetworkConfig[i];
          this.dataNetworkConfigWithId.push(sortedNetworks);
          this.isLoadingDataNetworkConfig = false;
        }
        console.log('************  Data network  with id ****************');
        console.log(this.dataNetworkConfigWithId);
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getDataNetworkConfig, err);
        this.isLoadingDataNetworkConfig = false;
        // this.toast.showError(error, 'Error');
        console.log(this.errorResponse);

      }
    );
  }


  // public saveNetwork(userid: number, networkId: number, agentCommission: number){
  //     console.log(" user details : "+userid+" "+networkId+" "+agentCommission);
  //     const networkDataObj = {
  //       'agentCommission' : agentCommission,
  //       'networkId' : networkId,
  //       'userId' : userid
  //     }
  //     this.isConfigSaving = true;
  //
  //   this.agentService.updateNetworkConfigs(networkDataObj).subscribe(
  //     response => {
  //       console.log("commission updated", response.data);
  //         this.getAgentNetworksConfig(false);
  //         this.toast.showSuccess('Agpent commission updated', 'Success');
  //         this.isConfigSaving = false;
  //         this.activeId = null;
  //     },
  //     err => {
  //       this.error = this.errorHandler.errorHandlerWithText(this.saveNetworkConfig, err);
  //       this.error = this.error.message;
  //     }
  //   )
  // }

  public resetUserAirtimeNetwork = () => {
    this.agentService.deleteUserAirtimeNetworkConfig(this.networkObj.configId).subscribe(
      response => {
        this.getAirtimeNetworkConfig(false);
        this.toast.showSuccess('Agent\'s  commission was reset to default', 'Success');
      },
      err => {
        const error = this.error.errorHandlerWithText(this.resetUserAirtimeNetwork, err).message;
        // console.log(error);
        this.toast.showError(error, 'Error');
      }
    );
  }

  public resetUserDataNetwork = () => {
    this.agentService.deleteUserDataNetworkConfig(this.networkObj.network.id).subscribe(
      response => {
        this.getDataNetworkConfig(false);
        this.toast.showSuccess('Agent\'s commission was reset to default', 'Success');
      },
      err => {
        const error = this.error.errorHandlerWithText(this.resetUserDataNetwork, err).message;
       // console.log(error);
        this.toast.showError(error, 'Error');
      }
    );
  }

  configureDialog(): void{

    const networkData = this.networkObj;

    const dialogRef = this.dialog.open(AgentDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        networkId : networkData.network.id,
        type : this.type,
        userId : this.userId,
        networkName : networkData.network.networkName,
        swiftaCommission: networkData.swiftaCommission,
        agentCommission: networkData.agentCommission,
        systemCommission: networkData.systemCommission
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'close'){
        return false;
      }
      console.log('result', result);
      if (result.updated){
        this.toast.showSuccess(result.networkName + ' commission updated', 'Network Updated');
      }

      if (this.type === 'AIRTIME'){
        this.getAirtimeNetworkConfig(false);
      }else{
        this.getDataNetworkConfig(false);
      }
    });

  }


  public getUser = () => {
    this.anonymousService.getUser(this.userId).subscribe(
      response => {
        this.userData = new User(response);

        this.allLoading.profile = false;

        this.initializeForm();
        if (this.userFormData.blocked) {
          this.isBlocked = false;
          this.blockingText = 'Blocked';
        } else {
          this.isBlocked = true;
          this.blockingText = 'Active';
        }
      },
      err => {
        this.error.errorHandlerWithText(this.getUser, err);
       // console.log(errMsg.message);
      }
    );
  }

  // public getUser = () => {
  //   this.anonymousService.getUser(this.userId).subscribe(
  //     data => {
  //       this.userData = new Agent(data);
  //       if (this.userData.disabled) {
  //         this.blockingText = 'Blocked';
  //         this.isBlocked = false;
  //       } else {
  //         this.blockingText = 'Active';
  //         this.isBlocked = true;
  //       }
  //     },
  //     err => {
  //       this.error.errorHandlerWithText(this.getUser, err);
  //     }
  //   )
  // }


  toggleBlockUser(): void {
    if (this.isBlocked) {
      this.blockUser();
    } else {
      this.unBlockUser();
    }
  }

  // block user
  blockUser = () => {
    const userId = this.userId;
    console.log('Block user:' + userId);
    this.blockingText = 'Blocking user...';
    this.agentService.blockUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.blockingText = 'blocked';
        this.isBlocked = false;
      },
      err => {
        console.log(err);
        const errMsg = this.error.errorHandlerWithText(this.blockUser, err);
        console.log(errMsg.message);
      }
    );
  }

// Unblock user
  unBlockUser = () => {
    const userId = this.userId;
    this.blockingText = 'Unblocking ...';
    console.log('Block user:' + userId);
    this.agentService.unblockUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.blockingText = 'Active';
        this.isBlocked = true;
      },
      err => {
        const errMsg = this.error.errorHandlerWithText(this.unBlockUser, err);
        console.log(errMsg.message);
      }
    );
  }


  editProfile(): void {
    this.isNotEdit = !this.isNotEdit;
  }
}

@Component({
  selector: 'dialog-result',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden;' +
  ' text-overflow: ellipsis; text-align: center;}' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;}' +
  ' background-color:#ededed; display: inline-block;} '],
  templateUrl: 'network-dialog.html',
})


export class AgentDialogComponent {
  systemCommission: any;
  swiftaCommission: any;
  agentCommission: any;
  networkName: any;
  networkId: any;
  type: string;
  userId: number;


  public amount: number;
  public isUpdating: boolean;


  constructor(
    public dialogRef: MatDialogRef<AgentDialogComponent>,
    private userService: UserService, private toastr: ToastService,
    private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', this.data);

    this.networkId = this.data.networkId;
    this.swiftaCommission = this.data.swiftaCommission;
    this.agentCommission = this.data.agentCommission;
    this.systemCommission = this.data.systemCommission;
    this.networkName = this.data.networkName;
    this.isUpdating = false;
    this.type = this.data.type;
    this.userId = this.data.userId;
  }


  updateNetwork = () => {

    // const networkData = {
    //   'agentCommission': this.agentCommission,
    //   'networkName': this.swiftaCommission,
    //   'systemCommission': this.systemCommission
    // }

    const configData = {
      agentCommission: this.agentCommission,
      networkId: this.networkId,
      userId: this.userId
    };

    const configMessage = {updated: false, networkName : ''} ;
    this.isUpdating = true;

    if (this.type === 'AIRTIME'){
      this.userService.createUserAirtimeNetworkConfig(configData).subscribe(
        data => {
          configMessage.updated = true;
          configMessage.networkName = this.networkName;
          this.isUpdating = false;

          this.dialogRef.close(configMessage);
        },
        err => {
          configMessage.updated = false;
          this.dialogRef.close(configMessage);
          const error = this.error.errorHandlerWithText(this.updateNetwork, err);
          console.log(error);
          this.toastr.showError(error.message, 'Error');
        }
      );
    }
    else if (this.type === 'DATA'){
      this.userService.createUserDataNetworkConfig(configData).subscribe(
        data => {
          configMessage.updated = true;
          configMessage.networkName = this.networkName;
          this.isUpdating = false;

          this.dialogRef.close(configMessage);
        },
        err => {
          configMessage.updated = false;
          this.dialogRef.close(configMessage);
          const msg = this.error.errorHandlerWithText(this.updateNetwork, err);
          console.log(msg);
          this.toastr.showError(msg.message, 'Error');

        }
      );
    }
  }



}
