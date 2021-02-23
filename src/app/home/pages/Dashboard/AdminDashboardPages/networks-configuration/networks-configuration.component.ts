import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../../../core/authentication/auth-service.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {MobileNetworks} from '../../../../../shared/mobile-networks';
import {Network} from '../../../../../core/mocks/network/network.model';
import {NetworkConfig} from '../../../../../core/mocks/network/network-config.model';


@Component({
  selector: 'app-networks-configuration',
  templateUrl: './networks-configuration.component.html',
  styleUrls: ['./networks-configuration.component.scss']
})
export class NetworksConfigurationComponent implements OnInit {
  type: string;
  isDataActive: any;
  isAirtimeActive: any;
  networkObj: any;

  p = 1;

  public setId = null;
  public isActive: boolean;

  public activeNetworkId: number;
  public networks = [];
  public networksWithId = [];
  public isLoadingNetworks: boolean;
  public isSavingNetwork: boolean;


  public airtimeNetworkConfig = [];
  public airtimeNetworkConfigWithId = [];
  public isLoadingAirtimeNetworkConfig: boolean;

  public dataNetworkConfig = [];
  public dataNetworkConfigWithId = [];
  public isLoadingDataNetworkConfig: boolean;

  public isloading: boolean;

  public errorResponse: any;
  pageTitle = 'Networks Configuration';

  public networksLogoPath: any = [];


  constructor(public dialog: MatDialog, public userService: UserService, public router: Router,
              public authService: AuthService, public error: ErrorService, public sharedService: SharedService,
              public toast: ToastService) {
    this.isLoadingNetworks = false;
    this.isLoadingAirtimeNetworkConfig = false;
    this.isLoadingDataNetworkConfig = false;
    this.isSavingNetwork = false;



    this.sharedService.emitChange(this.pageTitle);

    this.networks = [];
    this.airtimeNetworkConfig = [];
    this.dataNetworkConfig = [];

    this.networksLogoPath = MobileNetworks.networksLogoPath;
  }

  ngOnInit(): void {
    this.getAllNetworks(true);
    this.getAirtimeNetworkConfig(true);
    this.getDataNetworkConfig(true);
  }



// get network details
  getNetworkDetails(networkObj: any, type?: string): number {
    console.log('networkObj', networkObj);
    this.setId = networkObj.id;
    this.isAirtimeActive = networkObj.network.isAirtimeActive;
    this.isDataActive = networkObj.network.isDataActive;
    this.isActive = networkObj.status;
    this.networkObj = networkObj;
    this.type = type.toUpperCase();
    return this.setId;
  }

  public saveNetwork = (id, networkName: string) => {
    const networkDataObj = {
      networkName
    };
    this.isSavingNetwork = true;

    this.userService.updateNetworkConfig(id , networkDataObj).subscribe(
      response => {
        console.log('network updated', response.data);
        this.getAllNetworks(false);
        this.toast.showSuccess('Network updated', 'Success');
        this.isSavingNetwork = false;
        this.isloading = false;
        this.cancelEditNetwork();
      },
      err => {
        this.isSavingNetwork = false;
        console.log(err);
        this.error.errorHandlerWithText(this.saveNetwork, err);
      }
    );
  }

// block airtime network
  blockAirtimeNetwork = () => {
    this.isloading = true;
    const networkId = this.setId;
    console.log('Block network:' + networkId);
    this.userService.blockAirtimeNetwork(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllNetworks(false);
        this.getAirtimeNetworkConfig(false);
        this.toast.showSuccess('Airtime Network blocked successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.blockAirtimeNetwork, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }

  // block airtime network
  unblockAirtimeNetwork = () => {
    this.isloading = true;
    const networkId = this.setId;
    console.log('Block network:' + networkId);
    this.userService.unblockAirtimeNetwork(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllNetworks(false);
        this.getAirtimeNetworkConfig(false);
        this.toast.showSuccess('Airtime Network unblocked successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.unblockAirtimeNetwork, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }


  // block a network
  blockDataNetwork = () => {
    this.isloading = true;
    const networkId = this.setId;
    console.log('Block network:' + networkId);
    this.userService.blockDataNetwork(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllNetworks(false);
        this.getDataNetworkConfig(false);
        this.toast.showSuccess('Data Network blocked successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.blockDataNetwork, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }

  // block a network
  unblockDataNetwork = () => {
    this.isloading = true;
    const networkId = this.setId;
    console.log('Block network:' + networkId);
    this.userService.unblockDataNetwork(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllNetworks(false);
        this.getDataNetworkConfig(false);
        this.toast.showSuccess('Data Network unblocked successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.unblockDataNetwork, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }

// unblock user
  unBlockNetwork = () => {
    this.isloading = true;
    const userId = this.setId;
    console.log('Block user:' + userId);
    this.userService.unblockNetwork(this.setId).subscribe(
      data => {
        console.log(data);
        this.getAllNetworks(false);
        this.isloading = false;
        this.toast.showSuccess('Network unblocked successfully', 'Success');
      },
      err => {
        console.log(err);
        // if error response is due to expired token
        const msg = this.error.errorHandlerWithText(this.unBlockNetwork, err);
        this.toast.showError(msg.message, 'Error');      }
    );
  }

  ////////////////// get all networks ////////////////////////////////////////////////////
  getAllNetworks = (newLoad = false) => {

    this.networks = [];

    if (newLoad) {
      this.isLoadingNetworks = true;
    } else {
      this.isLoadingNetworks = false;
    }
    this.userService.getNetworks().subscribe(
      response => {
        console.log('************ Networks list ****************');
        response.data.forEach(network => {
          const dNetwork = new Network(network);
          this.networks.push(dNetwork);
        });

        console.log(this.networks);

        /* filter the network */

        this.networks.sort ( (a, b) => {
          return ( a.id - b.id  ||  a.networkName.localeCompare(b.networkName) );
        });

        this.networksWithId = [];

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
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAllNetworks, err);
        this.isLoadingNetworks = false;
        console.log(this.errorResponse);

      }
    );
  }

  public editNetwork(id): void {
    this.activeNetworkId = id;
  }

  public cancelEditNetwork(): void {
    this.activeNetworkId = null;
  }


  ////////////////// get airtime networks config ////////////////////////////////////////////////////
  getAirtimeNetworkConfig = (newLoad = false) => {
    if (newLoad) {
      this.isLoadingAirtimeNetworkConfig = true;
    } else {
      this.isLoadingAirtimeNetworkConfig = false;
    }

    this.userService.getAirtimeNetworkConfig().subscribe(
      response => {
        this.airtimeNetworkConfig = [];
        console.log('************ Airtime network list ****************');
        response.data.forEach(network => {
          const dAirtimeNetwork = new NetworkConfig(network);
          this.airtimeNetworkConfig.push(dAirtimeNetwork);
        });

        this.isloading = false;


        console.log(this.airtimeNetworkConfig);

        /* filter the network */
        this.airtimeNetworkConfigWithId = [];

        this.airtimeNetworkConfig.sort ( (a, b) => {
          return ( a.network.id - b.network.id  ||  a.network.networkName.localeCompare(b.network.networkName) );
        });

        for (let i = 0; i < this.airtimeNetworkConfig.length; i++ ) {
          const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
          sortedNetworks.id = i + 1;
          sortedNetworks.logoPath = this.networksLogoPath[this.airtimeNetworkConfig[i].network.networkCodeName];
          sortedNetworks.data = this.airtimeNetworkConfig[i];
          this.airtimeNetworkConfigWithId.push(sortedNetworks);
          this.isLoadingAirtimeNetworkConfig = false;
        }
        console.log('************  Airtime network  with id ****************');
        console.log(this.airtimeNetworkConfigWithId);
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getAirtimeNetworkConfig, err);
        this.isLoadingAirtimeNetworkConfig = false;
        console.log(this.errorResponse);

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

    this.userService.getDataNetworkConfig().subscribe(
      response => {
        this.dataNetworkConfig = [];
        console.log('************ Airtime network list ****************');
        response.data.forEach(network => {
          const dAirtimeNetwork = new NetworkConfig(network);
          this.dataNetworkConfig.push(dAirtimeNetwork);
        });

        this.isloading = false;


        console.log(this.dataNetworkConfig);

        /* filter the network */
        this.dataNetworkConfigWithId = [];

        this.dataNetworkConfig.sort ( (a, b) => {
          return ( a.network.id - b.network.id  ||  a.network.networkName.localeCompare(b.network.networkName) );
        });

        for (let i = 0; i < this.dataNetworkConfig.length; i++ ) {
          const sortedNetworks: any = {id: 0, logoPath: '', data: {}};
          sortedNetworks.id = i + 1;
          sortedNetworks.logoPath = this.networksLogoPath[this.dataNetworkConfig[i].network.networkCodeName];
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
        console.log(this.errorResponse);

      }
    );
  }


  configureDialog(): void{

    const networkData = this.networkObj;

    const dialogRef = this.dialog.open(NetworkDialogComponent, {
      height: '400px',
      width: '400px',
      data: {
        networkId : networkData.id,
        type : this.type,
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
      this.toast.showSuccess(result.networkName + ' commission updated', 'Network Updated');
      if (this.type === 'AIRTIME'){
        this.getAirtimeNetworkConfig(false);
      }else{
        this.getDataNetworkConfig(false);
      }

      this.getAllNetworks(false);
    });

  }

}


@Component({
  selector: 'dialog-result',
  styles: [ '.user-details { margin-bottom: 5px; white-space: nowrap; overflow: hidden;' +
  ' text-overflow: ellipsis; text-align: center;} ' +
  '.user-details span{ color:#444; text-transform:uppercase; text-overflow:ellipsis}' +
  '.wallet { font-weight: normal; padding:2px 5px; border-radius:5px;text-align: center;}'],
  templateUrl: './network-dialog.html',
})
export class NetworkDialogComponent {
  systemCommission: any;
  swiftaCommission: any;
  agentCommission: any;
  networkName: any;
  networkId: any;
  type: string;

  public amount: number;
  public isUpdating: boolean;


  constructor(
    public dialogRef: MatDialogRef<NetworkDialogComponent>, private userService: UserService, private error: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', this.data);

    this.networkId = this.data.networkId;
    this.swiftaCommission = this.data.swiftaCommission;
    this.agentCommission = this.data.agentCommission;
    this.systemCommission = this.data.systemCommission;
    this.networkName = this.data.networkName;
    this.isUpdating = false;
    this.type = this.data.type;
  }


  updateNetwork = () => {

    const networkData = {
      agentCommission: this.agentCommission,
      networkName: this.swiftaCommission,
      systemCommission: this.systemCommission
    };

    console.log('##', networkData);

    const configMessage = {updated: false, networkName : ''} ;
    this.isUpdating = true;

    if (this.type === 'AIRTIME'){
      this.userService.updateAirtimeNetworkConfig(this.networkId , networkData).subscribe(
        data => {
          console.log('data from network', data);
          configMessage.updated = true;
          configMessage.networkName = this.networkName;
          this.isUpdating = false;

          this.dialogRef.close(configMessage);
        },
        err => {
          console.log(err);
          const msg = this.error.errorHandlerWithText(this.updateNetwork, err);
        }
      );
    }
    else if (this.type === 'DATA'){
      this.userService.updateDataNetworkConfig(this.networkId , networkData).subscribe(
        data => {
          console.log('data from network', data);
          configMessage.updated = true;
          configMessage.networkName = this.networkName;
          this.isUpdating = false;

          this.dialogRef.close(configMessage);
        },
        err => {
          console.log(err);
          const msg = this.error.errorHandlerWithText(this.updateNetwork, err);
        }
      );
    }
  }



}
