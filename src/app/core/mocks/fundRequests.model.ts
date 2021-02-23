/**
 * Created by Anthony on 18/05/2018.
 */

import {Constants} from '../../shared/Constants';

export class FundRequests {
  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }

  get createdDate(): number {
    return this._createdDate;
  }

  set createdDate(value: number) {
    this._createdDate = value;
  }

  get depositorName(): string {
    return this._depositorName;
  }

  set depositorName(value: string) {
    this._depositorName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstName(): any {
    return this._firstName;
  }

  set firstName(value: any) {
    this._firstName = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get lastName(): any {
    return this._lastName;
  }

  set lastName(value: any) {
    this._lastName = value;
  }

  get mobileNo(): string {
    return this._mobileNo;
  }

  set mobileNo(value: string) {
    this._mobileNo = value;
  }

  get paymentDate(): number {
    return this._paymentDate;
  }

  set paymentDate(value: number) {
    this._paymentDate = value;
  }

  get paymentMode(): string {
    return this._paymentMode;
  }

  set paymentMode(value: string) {
    this._paymentMode = value;
  }

  get proofOfPayment(): string {
    return Constants.SERVICE_URL + '/' + this._proofOfPayment;
  }

  set proofOfPayment(value: string) {
    this._proofOfPayment = value;
  }

  get referenceId(): string {
    return this._referenceId;
  }

  set referenceId(value: string) {
    this._referenceId = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get updatedDate(): any {
    return this._updatedDate;
  }

  set updatedDate(value: any) {
    this._updatedDate = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }
  private _amount: number;
  private _balance: number;
  private _createdDate: number;
  private _depositorName: string;
  private _email: string;
  private _firstName: null;
  private _id: number;
  private _lastName: null;
  private _mobileNo: string;
  private _paymentDate: number;
  private _paymentMode: string;
  private _proofOfPayment: string;
  private _referenceId: string;
  private _status: number;
  private _updatedDate: null;
  private _userId: number;

  constructor(obj : any) {
    this._amount = obj.amount;
    this._balance = obj.balance;
    this._createdDate = obj.createdDate;
    this._depositorName = obj.depositorName;
    this._email = obj.email;
    this._firstName = obj.firstName;
    this._id = obj.id;
    this._lastName = obj.lastName;
    this._mobileNo = obj.mobileNo;
    this._paymentDate = obj.paymentDate;
    this._paymentMode = obj.paymentMode;
    this._proofOfPayment = obj.proofOfPayment;
    this._referenceId = obj.referenceId;
    this._status = obj.status;
    this._updatedDate = obj.updatedDate;
    this._userId = obj.userId;
  }
}
