import {Timestamp} from "rxjs";
/**
 * Created by Anthony on 11/05/2018.
 */

export class PayoutRequests {
  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get mobile(): string {
    return this._mobile;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): number {
    return this._status;
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  get updatedDate(): Timestamp<number> {
    return this._updatedDate;
  }

  get statusDetail(): string {
    let response : string;
    if(this._status === 0){
      response = 'Awaiting Approval';
    }
    else if(this._status === 1){
      response = 'Approved';
    }
    else if(this._status === -1){
      response = 'Declined';
    }
    else if(this._status === 2){
      response = 'Confirmed';
    }
    return response;
  }

  private _id: number;
  private _email: string;
  private _mobile: string;
  private _amount: number;
  private _status: number;
  private _createdDate : Timestamp<number>;
  private _updatedDate : Timestamp<number>;

  constructor(obj: any) {
    this._id = obj.id;
    this._email = obj.email;
    this._mobile = obj.mobile;
    this._amount = obj.amount;
    this._status = obj.status;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }

}

