/**
 * Created by Anthony on 28/05/2018.
 */

import {Timestamp} from 'rxjs';
import {Network} from './network.model';

import {Constants} from '../../../shared/Constants';

export class NetworkConfig {
  get id(): number {
    return this._id;
  }

  get network(): Network {
    return this._network;
  }

  get systemCommission(): number {
    return this._systemCommission;
  }

  get agentCommission(): number {
    return this._agentCommission;
  }

  get swiftaCommission(): number {
    return this._swiftaCommission;
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  get updatedDate(): Timestamp<number> {
    return this._updatedDate;
  }
  private _id:               number;
  private _network:          Network;
  private _systemCommission: number;
  private _agentCommission:  number;
  private _swiftaCommission: number;
  private _createdDate:      Timestamp<number>;
  private _updatedDate:      Timestamp<number>;

  constructor(obj: any) {
    this._id = obj.id;
    this._network = obj.network;
    this._systemCommission = obj.systemCommission;
    this._agentCommission = obj.agentCommission;
    this._swiftaCommission = obj.swiftaCommission;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
}
