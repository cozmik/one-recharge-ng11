export interface ServiceFeeInterface {
  feeAmount: number;
  isFeePercentage: number;
  isSuperAgentCommissionFixed: number;
  isSystemCommissionFixed: number;
  lowerBound: number;
  superAgentCommission: number;
  systemCommission: number;
  upperBound: number;
}

export class ServiceFee implements ServiceFeeInterface {

  constructor(object: any) {
    this._createdDate = object.createdDate;
    this._feeAmount = object.feeAmount;
    this._id = object.id;
    this._isFeePercentage = object.isFeePercentage;
    this._isSuperAgentCommissionFixed = object.isSuperAgentCommissionFixed;
    this._isSystemCommissionFixed = object.isSystemCommissionFixed;
    this._lowerBound = object.lowerBound;
    this._superAgentCommission = object.superAgentCommission;
    this._systemCommission = object.systemCommission;
    this._updatedDate = object.updatedDate;
    this._upperBound = object.upperBound;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get feeAmount(): number {
    return this._feeAmount;
  }

  set feeAmount(value: number) {
    this._feeAmount = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get isFeePercentage(): number {
    return this._isFeePercentage;
  }

  set isFeePercentage(value: number) {
    this._isFeePercentage = value;
  }

  get isSuperAgentCommissionFixed(): number {
    return this._isSuperAgentCommissionFixed;
  }

  set isSuperAgentCommissionFixed(value: number) {
    this._isSuperAgentCommissionFixed = value;
  }

  get isSystemCommissionFixed(): number {
    return this._isSystemCommissionFixed;
  }

  set isSystemCommissionFixed(value: number) {
    this._isSystemCommissionFixed = value;
  }

  get lowerBound(): number {
    return this._lowerBound;
  }

  set lowerBound(value: number) {
    this._lowerBound = value;
  }

  get superAgentCommission(): number {
    return this._superAgentCommission;
  }

  set superAgentCommission(value: number) {
    this._superAgentCommission = value;
  }

  get systemCommission(): number {
    return this._systemCommission;
  }

  set systemCommission(value: number) {
    this._systemCommission = value;
  }

  get updatedDate(): Date {
    return this._updatedDate;
  }

  set updatedDate(value: Date) {
    this._updatedDate = value;
  }

  get upperBound(): number {
    return this._upperBound;
  }

  set upperBound(value: number) {
    this._upperBound = value;
  }

  private _createdDate: Date;
  private _feeAmount: number;
  private _id: number;
  private _isFeePercentage: number;
  private _isSuperAgentCommissionFixed: number;
  private _isSystemCommissionFixed: number;
  private _lowerBound: number;
  private _superAgentCommission: number;
  private _systemCommission: number;
  private _updatedDate: Date;
  private _upperBound: number;
}
