
export interface ServicePackageInterface {
  amount: number;
  code: number;
  createdDate: Date;
  description: string;
  fee: number;
  id: number;
  name: string;
  updatedDate: Date | null;
}

export class ServicePackageModel implements ServicePackageInterface {

  constructor(object: any) {
    this._amount = object.amount;
    this._code = object.code;
    this._createdDate = object.createdDate;
    this._description = object.description;
    this._fee = object.fee;
    this._id = object.id;
    this._name = object.name;
    this._updatedDate = object.updatedDate;
  }

  private _amount: number;
  private _code: number;
  private _createdDate: Date;
  private _description: string;
  private _fee: number;
  private _id: number;
  private _name: string;
  private _updatedDate: Date | null;

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get fee(): number {
    return this._fee;
  }

  set fee(value: number) {
    this._fee = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get updatedDate(): Date | null {
    return this._updatedDate;
  }

  set updatedDate(value: Date | null) {
    this._updatedDate = value;
  }
}
