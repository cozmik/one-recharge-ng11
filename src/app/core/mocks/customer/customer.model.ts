
/**
 * Created by Anthony on 11/05/2018.
 */
import {Timestamp} from 'rxjs';
import {Role} from '../user/role.model';
// import {ErrorService} from '../Services/error_service/error.service';
// import {AgentService} from '../../services/users-service/agent/agent-service';

import {Constants} from '../../../shared/Constants';

export class Customer {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get userType(): string {
    return this._userType;
  }

  set userType(value: string) {
    this._userType = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get mobile(): string {
    return this._mobile;
  }

  set mobile(value: string) {
    this._mobile = value;
  }

  get walletBalance(): number {
    return this._walletBalance;
  }

  set walletBalance(value: number) {
    this._walletBalance = value;
  }

  get walletCommissionBalance(): number {
    return this._walletCommissionBalance;
  }

  set walletCommissionBalance(value: number) {
    this._walletCommissionBalance = value;
  }

  get deleted(): number {
    return this._deleted;
  }

  set deleted(value: number) {
    this._deleted = value;
  }

  get blocked(): number {
    return this._blocked;
  }

  set blocked(value: number) {
    this._blocked = value;
  }

  get active(): number {
    return this._active;
  }

  set active(value: number) {
    this._active = value;
  }

  get lastLoginDate(): Timestamp<number> {
    return this._lastLoginDate;
  }

  set lastLoginDate(value: Timestamp<number>) {
    this._lastLoginDate = value;
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  set createdDate(value: Timestamp<number>) {
    this._createdDate = value;
  }

  get updatedDate(): Timestamp<number> {
    return this._updatedDate;
  }

  set updatedDate(value: Timestamp<number>) {
    this._updatedDate = value;
  }

  get api(): string {
    return this._api;
  }

  set api(value: string) {
    this._api = value;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  private _id : number;
  private _email : string;
  private _userType : string;
  private _firstName : string;
  private _lastName : string;
  private _address : string;
  private _mobile : string;
  private _walletBalance : number;
  private _walletCommissionBalance : number;
  private _deleted : number;
  private _blocked : number;
  private _active : number;
  private _lastLoginDate : Timestamp<number>;
  private _createdDate : Timestamp<number>;
  private _updatedDate : Timestamp<number>;

  private _api = Constants.SERVICE_URL;


  constructor(obj : any){
    this._id = obj.id;
    this._email = obj.email;
    this._userType = obj.userType;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._address = obj.address;
    this._mobile = obj.mobile;
    this._walletBalance = obj.walletBalance;
    this._walletCommissionBalance = obj.walletCommissionBalance;
    this._deleted = obj.deleted;
    this._blocked = obj.blocked;
    this._active = obj.active;
    this._lastLoginDate = obj.lastLoginDate;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
}



/////////// Block agent function/////////////////////////////////////
// public block = (callBack?: Function) => {
//   this.processing = true;
//   this.blockStatus = 'Processing...';
//   this.agentService.blockUser(this.id).subscribe(
//     data => {
//     this.disabled = 1;
//   this.getBlockedStatus();
//   this.notifier = {success: true, status: 'Success', message: this.agentTypeName + ' blocked Successfully'};
//   this.processing = false;
//   if (callBack) {
//     callBack();
//   }
// },
//   err => {
//     console.log(err);
//     this.disabled = 0;
//     this.getBlockedStatus();
//     const errMsg = this.error.errorHandlerWithText(this.block, err);
//     this.notifier = {success: false, status: 'Failed', message: errMsg.message};
//     this.processing = false;
//     console.log(errMsg.message);
//     if (callBack) {
//       callBack();
//     }
//   }
// )
// }

//////////////////// Unblock Agent function /////////////////////////////////////////
// unblock = (callBack?: Function) => {
//   this.blockStatus = 'Processing...';
//   this.processing = true;
//   this.agentService.unblockUser(this.id).subscribe(
//     data => {
//     this.disabled = 0;
//   this.getBlockedStatus();
//   this.notifier = {success: true, status: 'Success', message: this.agentTypeName + ' unblocked Successfully'};
//   this.processing = false;
//   if (callBack) {
//     callBack();
//   }
// },
//   err => {
//     console.log(err);
//     this.disabled = 1;
//     this.getBlockedStatus();
//     const msg = this.error.errorHandlerWithText(this.unblock, err);
//     this.processing = false;
//     this.notifier = {success: false, status: 'Failed', message: msg.message};
//     if (callBack) {
//       callBack();
//     }
//   }
// )
// }

////////////////////// delete agent function /////////////////////////////////////
// delete = (callBack?: Function) => {
//   this.deleteStatus = 'Processing...';
//   this.processing = true;
//   this.agentService.deleteUser(this.id).subscribe(
//     data => {
//     console.log('Deleted');
//   this.deleted = 1;
//   this.processing = false;
//   this.notifier = {success: true, status: 'Success', message: this.agentTypeName + ' deleted Successfully'};
//   if (callBack) {
//     callBack();
//   }
// },
//   err => {
//     console.log(err);
//     const msg = this.error.errorHandlerWithText(this.delete, err);
//     this.notifier = {success: false, status: 'Failed', message: msg.message};
//     this.processing = false;
//     if (callBack) {
//       callBack();
//     }
//   }
// )
// }


//////////////////////////// Update Agent ///////////////////////////////////
// update = (data, callBack?: Function) => {
//   this.processing = true;
//   const formData = data;
//   console.log(data);
//   this.altMobileNo = data.altMobileNo;
//   this.email = data.email;
//   this.firstName = data.firstName;
//   this.landmark = data.landmark;
//   this.lastName = data.lastName;
//   this.lga = data.lga;
//   this.locality = data.locality;
//   this.mobile = data.mobileNo;
//   this.street = data.street;
//   this.town = data.town;
//   this.country = data.country;
//   this.state = data.state;
//   this.role = data.role;
//
//   // delete formData['country'];
//   // delete formData['state'];
//   // delete formData['role'];
//
//   this.agentService.updateAgent(formData, this.id).subscribe(
//     res => {
//     this._updateData = res;
//   console.log('Updated');
//   this.processing = false;
//   this.notifier = {success: true, status: 'Success', message: this.agentTypeName + ' updated Successfully'};
//
//   if (callBack) {
//     callBack();
//   }
//   this.processing = false;
//   return res;
// },
//   err => {
//     console.log(err);
//     this.processing = false;
//     const msg = this.error.errorHandlerWithText(this.update, err);
//     this.notifier = {success: false, status: 'Failed', message: msg.message};
//     this.processing = false;
//     if (callBack) {
//       callBack();
//     }
//   });
// }
// }


