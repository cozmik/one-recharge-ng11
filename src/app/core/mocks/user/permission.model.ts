/**
 * Created by Anthony on 11/05/2018.
 */

import {Timestamp} from 'rxjs';

export class Permission {
  createdDate: Timestamp<number>;
  groupName: string;
  id: number;
  name: string;
  updatedDate: Timestamp<number>
}

