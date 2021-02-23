/**
 * Created by Anthony on 28/05/2018.
 */


/**
 * Created by Anthony on 11/05/2018.
 */
import {Timestamp} from 'rxjs';

import {Constants} from '../../../shared/Constants';

export class Network {
  get id(): number {
    return this._id;
  }

  get networkName(): string {
    return this._networkName;
  }

  get networkCodeName(): string {
    return this._networkCodeName;
  }

  get networkLogo(): string {
    return this._networkLogo;
  }

  get isAirtimeActive(): number {
    return this._isAirtimeActive;
  }

  get isDataActive(): number {
    return this._isDataActive;
  }

  get airtimeStatus(): string {
    return this._isAirtimeActive ? 'Active' : 'Blocked';
  }

  get dataStatus(): string {
    return this._isDataActive ? 'Active' : 'Blocked';
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  get updatedDate(): Timestamp<number> {
    return this._updatedDate;
  }

  private _id:              number;
  private _networkName:     string;
  private _networkCodeName: string;
  private _networkLogo:     string;
  private _isAirtimeActive: number;
  private _isDataActive:    number;
  private _createdDate:     Timestamp<number>;
  private _updatedDate:     Timestamp<number>;

  constructor(obj : any) {
    this._id = obj.id;
    this._networkName = obj.networkName;
    this._networkCodeName = obj.networkCodeName;
    this._networkLogo = obj.networkLogo;
    this._isAirtimeActive = obj.isAirtimeActive;
    this._isDataActive = obj.isDataActive;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }

}

