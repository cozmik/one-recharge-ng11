/**
 * Created by Anthony on 11/05/2018.
 */

import {Timestamp} from 'rxjs';
import {Permission} from './permission.model';
import {Role} from './role.model';
import {Constants} from '../../../shared/Constants';

export class User {

  /////////////////// Convert agent type to readable string ///////////////////////////////////
  get agentTypeName(): string {
    let agentTypeName = '';
    if (this._isSubSuperAgent) {
      agentTypeName = 'Sub Super Agent';
    } else if (this._isSuperAgent) {
      agentTypeName = 'Super Agent';
    } else if ( this._userType.toLowerCase() === 'admin'){
      agentTypeName = 'Admin';
    }
    else {
      agentTypeName = 'Agent';
    }
    return agentTypeName;
  }

  get fullName(): string {
    return this._firstName + ' ' + this._lastName;
  }


  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get mobile(): string {
    return this._mobile;
  }

  get userType(): UserType {
    return this._userType;
  }

  get role(): Role {
    return this._role;
  }

  get createdByUserId(): number {
    return this._createdByUserId;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get address(): string {
    return this._address;
  }

  get altMobileNo(): string {
    return this._altMobileNo;
  }

  get profileImage(): any {
    return this._profileImage ?  Constants.SERVICE_URL + '/' + this._profileImage : 'assets/img/avatar.jpg';
  }

  get walletBalance(): number {
    return this._walletBalance;
  }

  get freezedAmount(): number {
    return this._freezedAmount;
  }

  get walletCommissionBalance(): number {
    return this._walletCommissionBalance;
  }

  get passwordChanged(): number {
    return this._passwordChanged;
  }

  get mobileVerified(): number {
    return this._mobileVerified;
  }

  get ussdPin(): string {
    return this._ussdPin;
  }

  get isSuperAgent(): number {
    return this._isSuperAgent;
  }

  get isSubSuperAgent(): number {
    return this._isSubSuperAgent;
  }

  get superAgentId(): number {
    return this._superAgentId;
  }

  get deleted(): number {
    return this._deleted;
  }

  get blocked(): number {
    return this._blocked;
  }

  get active(): number {
    return this._active;
  }

  get lastLoginDate(): Timestamp<number> {
    return this._lastLoginDate;
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  get updatedDate(): any {
    return this._updatedDate;
  }
  private _id:                      number;
  private _email:                   string;
  private _mobile:                  string;
  private _userType:                UserType;
  private _role:                    Role;
  private _createdByUserId:         number;
  private _firstName:               string;
  private _lastName:                string;
  private _address:                 string;
  private _altMobileNo:             string;
  private _profileImage:            null;
  private _walletBalance:           number;
  private _freezedAmount:           number;
  private _walletCommissionBalance: number;
  private _passwordChanged:         number;
  private _mobileVerified:          number;
  private _ussdPin:                 string;
  private _isSuperAgent:            number;
  private _isSubSuperAgent:         number;
  private _superAgentId:            number;
  private _deleted:                 number;
  private _blocked:                 number;
  private _active:                  number;
  private _lastLoginDate:           Timestamp<number> ;
  private _createdDate:             Timestamp<number> ;
  private _updatedDate:             null;

  constructor(obj: any) {
    this._id = obj.id;
    this._email = obj.email;
    this._mobile = obj.mobile;
    this._userType = obj.userType;
    this._role = obj.role;
    this._createdByUserId = obj.createdByUserId;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._address = obj.address;
    this._altMobileNo = obj.altMobileNo;
    this._profileImage = obj.profileImage;
    this._walletBalance = obj.walletBalance;
    this._freezedAmount = obj.freezedAmount;
    this._walletCommissionBalance = obj.walletCommissionBalance;
    this._passwordChanged = obj.passwordChanged;
    this._mobileVerified = obj.mobileVerified;
    this._ussdPin = obj.ussdPin;
    this._isSuperAgent = obj.isSuperAgent;
    this._isSubSuperAgent = obj.isSubSuperAgent;
    this._superAgentId = obj.superAgentId;
    this._deleted = obj.deleted;
    this._blocked = obj.blocked;
    this._active = obj.active;
    this._lastLoginDate = obj.lastLoginDate;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }


  getBlockedStatus() {
    let blockStatus = '';
    if (this._blocked) {
      blockStatus = 'Blocked';
    } else {
      blockStatus = 'Active';
    }
    return blockStatus;
  }

  getUserType(){
    let userType = '';
    if (this._isSuperAgent){
      userType = Constants.SUPER_AGENT_USERTYPE;
    }
    else if (this._isSubSuperAgent){
      userType = Constants.SUB_SUPER_AGENT_USERTYPE;
    }
    else if (this._userType === Constants.ADMIN_USERTYPE){
      userType = Constants.ADMIN_USERTYPE;
    }
    else if (this.userType === Constants.AGENT_USERTYPE){
      userType = Constants.AGENT_USERTYPE;
    }
    return userType;
  }

  isPermittedTo(perm: string): boolean {
    const test = this._role.permissions.filter(data => data.name === perm);
    if (test.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

export enum UserType {
  Admin = 'ADMIN',
  Agent = 'AGENT',
  SuperAgent = 'SUPER_AGENT',
}
