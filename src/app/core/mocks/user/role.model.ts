/**
 * Created by Anthony on 11/05/2018.
 */

import {Timestamp} from 'rxjs';
import {Permission} from './permission.model';

export class Role {
  get name(): string {
    return this._name;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  createdDate: Timestamp<number>
  id: number;
  private _name: string;
  private _permissions: Permission[];
  updatedDate: Timestamp<number>
  userType: string;

}
