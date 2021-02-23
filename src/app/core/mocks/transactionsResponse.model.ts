/**
 * Created by Anthony on 16/05/2018.
 */

import {Timestamp} from 'rxjs';

export class TransactionsResponse {
  get isRefunded(): number {
    return this._isRefunded;
  }

  get isRetriedTransaction(): number {
    return this._isRetriedTransaction;
  }

  get isRetrySuccessful(): number {
    return this._isRetrySuccessful;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return this._firstName + ' ' + this._lastName;
  }

  get getFromFullname(): string {
    return `${this._fromFirstName ? this._fromFirstName : '-'}  ${this._fromLastName ? this._fromLastName : '-'}`;
  }

  get networkCodeName(): string {
    return this._networkCodeName;
  }

  get networkName(): string {
    return this._networkName;
  }

  get retriedTransactionId(): number {
    return this._retriedTransactionId;
  }

  get retries(): number {
    return this._retries;
  }

  get userId(): number {
    return this._userId;
  }
  get firstName(): string {
    return this._firstName;
  }
  get email(): string {
    return this._email;
  }
  get agentWalletType(): string {
    return this._agentWalletType;
  }

  get amount(): number {
    return this._amount;
  }

  get channel(): string {
    return this._channel;
  }

  get commission(): number {
    return this._commission;
  }

  get createdDate(): Timestamp<number> {
    return this._createdDate;
  }

  get description(): string {
    return this._description;
  }

  get fromId(): number {
    return this._fromId;
  }

  get fromType(): string {
    return this._fromType;
  }

  get id(): number {
    return this._id;
  }

  get network(): number {
    return this._network;
  }

  get networkId(): number {
    return this._networkId;
  }

  get paymentRef(): any {
    return this._paymentRef;
  }

  get paymentStatus(): number {
    return this._paymentStatus;
  }

  get status(): number {
    return this._status;
  }

  get toId(): number {
    return this._toId;
  }

  get toMsisdn(): string {
    return this._toMsisdn;
  }

  get toType(): string {
    return this._toType;
  }

  get transactionId(): string {
    return this._transactionId;
  }

  get transactionType(): string {
    return this._transactionType.replace(/_/g, ' ');
  }

  get updatedDate(): Timestamp<number> {
    return this._updatedDate;
  }

  get vendRefNo(): string {
    return this._vendRefNo;
  }

  get vendSessionId(): string {
    return this._vendSessionId;
  }

  private _fromFirstName:   string;
  private _fromLastName:    string;
  private _fromEmail:       string;
  private _agentWalletType: string;
  private _amount:          number;
  private _channel:         string;
  private _commission:      number;
  private _createdDate:     Timestamp<number>;
  private _description:     string;
  private _email:           string;
  private _firstName:       string;
  private _fromId:          number;
  private _fromType:        string;
  private _id:              number;
  private _isRefunded:       number;
  private _isRetriedTransaction: number;
  private _isRetrySuccessful: number;
  private _lastName:         string;
  private _network:         number;
  private _networkCodeName:  string;
  private _networkId:       number;
  private _networkName:      string;
  private _paymentRef:      any;
  private _paymentStatus:   number;
  private _retriedTransactionId: number;
  private _retries:         number;
  private _status:          number;
  private _toId:            number;
  private _toMsisdn:        string;
  private _toType:          string;
  private _transactionId:   string;
  private _transactionType: string;
  private _userId:          number;
  private _updatedDate:     Timestamp<number>;
  private _vendRefNo:       string;
  private _vendSessionId:   string;

  constructor(obj: any) {
    this._agentWalletType = obj.agentWalletType;
    this._amount = obj.amount;
    this._channel = obj.channel;
    this._commission = obj.commission;
    this._createdDate = obj.createdDate;
    this._description = obj.description;
    this._email = obj.email;
    this._firstName = obj.firstName;
    this._fromId = obj.fromId;
    this._fromType = obj.fromType;
    this._fromFirstName = obj.fromFirstName;
    this._fromLastName = obj.fromLastName;
    this._fromEmail = obj.fromEmail;
    this._id = obj.id;
    this._isRefunded = obj.isRefunded;
    this._isRetriedTransaction = obj.isRetriedTransaction;
    this._isRetrySuccessful = obj.isRetrySuccessful;
    this._lastName = obj.lastName;
    this._network = obj.network;
    this._networkCodeName = obj.networkCodeName;
    this._networkId = obj.networkId;
    this._networkName = obj.networkName;
    this._paymentRef = obj.paymentRef;
    this._paymentStatus = obj.paymentStatus;
    this._retriedTransactionId = obj.retriedTransactionId;
    this._retries = obj.retries;
    this._status = obj.status;
    this._toId = obj.toId;
    this._toMsisdn = obj.toMsisdn;
    this._toType = obj.toType;
    this._transactionId = obj.transactionId;
    this._transactionType = obj.transactionType;
    this._userId = obj.userId;
    this._updatedDate = obj.updatedDate;
    this._vendRefNo = obj.vendRefNo;
    this._vendSessionId = obj.vendSessionId;
  }
}

// {
//   "agentWalletType":"WALLET_MAIN",
//   "amount":5000,
//   "channel":"MOBILE",
//   "commission":75,
//   "createdDate":1526470382397,
//   "description":"Vend Success",
//   "fromId":6,
//   "fromType":"AGENT",
//   "id":2,
//   "network":1,
//   "networkId":1,
//   "paymentRef":null,
//   "paymentStatus":0,
//   "status":1,
//   "toId":0,
//   "toMsisdn":"07066365036",
//   "toType":"GUEST",
//   "transactionId":"299cd374342941d3a8e6352ea8edd7b3",
//   "transactionType":"AIRTIME_TRANSFER",
//   "updatedDate":null,
//   "vendRefNo":"32",
//   "vendSessionId":"802571"
// }
