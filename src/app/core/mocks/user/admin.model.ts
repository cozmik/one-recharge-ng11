/**
 * Created by Anthony on 11/05/2018.
 */

import {Timestamp} from 'rxjs';
import {Permission} from './permission.model';
import {Role} from './role.model';

export class Admin {

  private _id:            number;
  private _firstName:     string;
  private _lastName:      string;
  private _email:         string;
  private _mobile:        string;
  private _userType:      string;
  private _role:          Role;
  private _permissions:   Permission[];
  private _active:        number;
  private _blocked:       number;
  private _deleted:       number;
  private _lastLoginDate: number;
  private _createdDate:   number;
  private _updatedDate:   null;

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get mobile(): string {
    return this._mobile;
  }

  get userType(): string {
    return this._userType;
  }

  get role(): Role {
    return this._role;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  get active(): number {
    return this._active;
  }

  get blocked(): number {
    return this._blocked;
  }

  get deleted(): number {
    return this._deleted;
  }

  get lastLoginDate(): number {
    return this._lastLoginDate;
  }

  get createdDate(): number {
    return this._createdDate;
  }

  get updatedDate(): any {
    return this._updatedDate;
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

  isPermittedTo(perm: string): boolean {
    const test = this._role.permissions.filter(data => data.name === perm);
    if (test.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  constructor(obj: any) {
    this._id = obj.id;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._email = obj.email;
    this._mobile = obj.mobile;
    this._userType = obj.userType;
    this._role = obj.role;
    this._permissions = obj.permissions;
    this._active = obj.active;
    this._blocked = obj.blocked;
    this._deleted = obj.deleted;
    this._lastLoginDate = obj.astLoginDate;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
}

export enum UserType {
  Admin = 'ADMIN',
  Agent = 'AGENT',
  SuperAgent = 'SUPER_AGENT',
}
