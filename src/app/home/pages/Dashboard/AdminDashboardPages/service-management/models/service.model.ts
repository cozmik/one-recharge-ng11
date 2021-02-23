import {CategoryInterface, ServiceCategoryModel} from './service-category.model';
import {ServiceFee, ServiceFeeInterface} from './service-fee.model';
import {ServicePackageInterface, ServicePackageModel} from './service-package.model';
import {Constants} from '../../../../../../shared/Constants';

export interface ServiceInterface {
  agentCommission: number;
  convenienceFee: number;
  createdDate: Date;
  description: string;
  feeType: number;
  hasConvenienceFee: number;
  hasFee: number;
  hasProducts: number;
  id: number;
  isCommissionFixed: number;
  isCommissionFromAmount: number;
  isCommissionPerFee: number;
  isDownLineCommissionFixed: number;
  isServiceProviderCommissionFixed: number;
  isUpLineCommissionFixed: number;
  serviceCategory: CategoryInterface;
  serviceCode: string;
  serviceFees: ServiceFeeInterface[];
  serviceLogo: string;
  serviceName: string;
  servicePackages: ServicePackageInterface[];
  serviceProviderCommission: number;
  serviceProviderHasCommission: number;
  serviceProviderName: string;
  status: number;
  superAgentCommission: number;
  systemCommission: number;
}

export class ServiceModel implements ServiceInterface{

  serviceUrl = Constants.SERVICE_URL + '/';

  private _agentCommission: number;
  private _convenienceFee: number;
  private _createdDate: Date;
  private _description: string;
  private _feeType: number;
  private _hasConvenienceFee: number;
  private _hasFee: number;
  private _hasProducts: number;
  private _id: number;
  private _isCommissionFixed: number;
  private _isCommissionFromAmount: number;
  private _isCommissionPerFee: number;
  private _isDownLineCommissionFixed: number;
  private _isServiceProviderCommissionFixed: number;
  private _isUpLineCommissionFixed: number;
  private _serviceCategory: ServiceCategoryModel;
  private _serviceCode: string;
  private _serviceFees: ServiceFee[];
  private _serviceLogo: string;
  private _serviceName: string;
  private _servicePackages: ServicePackageModel[];
  private _serviceProviderCommission: number;
  private _serviceProviderHasCommission: number;
  private _serviceProviderName: string;
  private _status: number;
  private _superAgentCommission: number;
  private _systemCommission: number;

  constructor(object: any) {
    this._agentCommission = object.agentCommission;
    this._convenienceFee = object.convenienceFee;
    this._createdDate = object.createdDate;
    this._description = object.description;
    this._feeType = object.feeType;
    this._hasConvenienceFee = object.hasConvenienceFee;
    this._hasFee = object.hasFee;
    this._hasProducts = object.hasProducts;
    this._id = object.id;
    this._isCommissionFixed = object.isCommissionFixed;
    this._isCommissionFromAmount = object.isCommissionFromAmount;
    this._isCommissionPerFee = object.isCommissionPerFee;
    this._isDownLineCommissionFixed = object.isDownLineCommissionFixed;
    this._isServiceProviderCommissionFixed = object.isServiceProviderCommissionFixed;
    this._isUpLineCommissionFixed = object.isUpLineCommissionFixed;
    this._serviceCategory = object.serviceCategories;
    this._serviceCode = object.serviceCode;
    this._serviceFees = object.serviceFees;
    this._serviceLogo = object.serviceLogo;
    this._serviceName = object.serviceName;
    this._servicePackages = object.servicePackages;
    this._serviceProviderCommission = object.serviceProviderCommission;
    this._serviceProviderHasCommission = object.serviceProviderHasCommission;
    this._serviceProviderName = object.serviceProviderName;
    this._status = object.status;
    this._superAgentCommission = object.superAgentCommission;
    this._systemCommission = object.systemCommission;
  }

  get agentCommission(): number {
    return this._agentCommission;
  }

  set agentCommission(value: number) {
    this._agentCommission = value;
  }

  get convenienceFee(): number {
    return this._convenienceFee;
  }

  set convenienceFee(value: number) {
    this._convenienceFee = value;
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

  get feeType(): number {
    return this._feeType;
  }

  set feeType(value: number) {
    this._feeType = value;
  }

  get hasConvenienceFee(): number {
    return this._hasConvenienceFee;
  }

  set hasConvenienceFee(value: number) {
    this._hasConvenienceFee = value;
  }

  get hasFee(): number {
    return this._hasFee;
  }

  set hasFee(value: number) {
    this._hasFee = value;
  }

  get hasProducts(): number {
    return this._hasProducts;
  }

  set hasProducts(value: number) {
    this._hasProducts = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get isCommissionFixed(): number {
    return this._isCommissionFixed;
  }

  set isCommissionFixed(value: number) {
    this._isCommissionFixed = value;
  }

  get isCommissionFromAmount(): number {
    return this._isCommissionFromAmount;
  }

  set isCommissionFromAmount(value: number) {
    this._isCommissionFromAmount = value;
  }

  get isCommissionPerFee(): number {
    return this._isCommissionPerFee;
  }

  set isCommissionPerFee(value: number) {
    this._isCommissionPerFee = value;
  }

  get isDownLineCommissionFixed(): number {
    return this._isDownLineCommissionFixed;
  }

  set isDownLineCommissionFixed(value: number) {
    this._isDownLineCommissionFixed = value;
  }

  get isServiceProviderCommissionFixed(): number {
    return this._isServiceProviderCommissionFixed;
  }

  set isServiceProviderCommissionFixed(value: number) {
    this._isServiceProviderCommissionFixed = value;
  }

  get isUpLineCommissionFixed(): number {
    return this._isUpLineCommissionFixed;
  }

  set isUpLineCommissionFixed(value: number) {
    this._isUpLineCommissionFixed = value;
  }

  get serviceCategory(): ServiceCategoryModel {
    return this._serviceCategory;
  }

  set serviceCategory(value: ServiceCategoryModel) {
    this._serviceCategory = value;
  }

  get serviceCode(): string {
    return this._serviceCode;
  }

  set serviceCode(value: string) {
    this._serviceCode = value;
  }

  get serviceFees(): ServiceFee[] {
    const serviceFees = [];
    if (this._serviceFees) {
      this._serviceFees.forEach(sf => {
        serviceFees.push(new ServiceFee(sf));
      });
    }
    return serviceFees;
  }

  set serviceFees(value: ServiceFee[]) {
    this._serviceFees = value;
  }

  get serviceLogo(): string {
    if (!this._serviceLogo) {
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNS45OTUiIGhlaWdodD0iMzUuOTk1IiB2aWV3Qm94PSIwIDAgMzUuOTk1IDM1Ljk5NSI+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im0wOWxvZ253NGEiIHgxPSIuNSIgeDI9Ii41IiB5Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZmE0ZDIiIHN0b3Atb3BhY2l0eT0iLjYiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA1MjY5Ii8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGZpbGw9InVybCgjbTA5bG9nbnc0YSkiIGQ9Ik0xMy4yNzUgMjQuMzIxbDEuOTI1LTEuOTI2YTIuMDU2IDIuMDU2IDAgMCAwIC41NDguMTEyIDIuMjUgMi4yNSAwIDEgMC0yLjI1LTIuMjUgMi4wNTYgMi4wNTYgMCAwIDAgLjExMy41NDhsLTEuOTI3IDEuOTI3LTguMjExLTguMjEyYTEuMTE1IDEuMTE1IDAgMCAwLTEuNzU4LjIxMSAxNC40MzUgMTQuNDM1IDAgMCAwIDE5LjU0OCAxOS41NDYgMS4xMDcgMS4xMDcgMCAwIDAgLjIxMS0xLjc1OHpNMTQuNyAwYTEuMTMyIDEuMTMyIDAgMCAwLTEuMiAxLjEyNXYyLjIyMmExLjExNCAxLjExNCAwIDAgMCAxLjA1NSAxLjExOCAxOC4wNTggMTguMDU4IDAgMCAxIDE2LjkzOCAxNi45OCAxLjEyMyAxLjEyMyAwIDAgMCAxLjExOCAxLjA1NWgyLjI1N2ExLjEzMiAxLjEzMiAwIDAgMCAxLjEyNS0xLjJBMjIuNTU0IDIyLjU1NCAwIDAgMCAxNC43IDB6bS4wMjEgNi43NUExLjEzNCAxLjEzNCAwIDAgMCAxMy41IDcuODgydjIuMjU3YTEuMTIxIDEuMTIxIDAgMCAwIDEuMDQxIDEuMTE4IDExLjIzMSAxMS4yMzEgMCAwIDEgMTAuMTg4IDEwLjIwOSAxLjEzIDEuMTMgMCAwIDAgMS4xMTggMS4wMzRoMi4yNjRhMS4xMzkgMS4xMzkgMCAwIDAgMS4xMzItMS4yMTZBMTUuODIgMTUuODIgMCAwIDAgMTQuNzE2IDYuNzV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC4wMDIpIi8+Cjwvc3ZnPgo=';
    } else {
      if ((this._serviceLogo.indexOf(this.serviceUrl) === -1) && (this._serviceLogo.indexOf('assets/images/no-service-logo.svg') === -1)) {
        return this.serviceUrl + this._serviceLogo;
      } else {
        return this._serviceLogo;
      }
    }
  }

  set serviceLogo(value: string) {
    this._serviceLogo = value;
  }

  get serviceName(): string {
    return this._serviceName;
  }

  set serviceName(value: string) {
    this._serviceName = value;
  }

  get servicePackages(): ServicePackageModel[] {
    const servicePackageModel = [];
    if (this._servicePackages && this._servicePackages.length) {
      this._servicePackages.forEach(sp => {
        servicePackageModel.push(new ServicePackageModel(sp));
      });
      return servicePackageModel;
    }
    return null;
  }

  set servicePackages(value: ServicePackageModel[]) {
    this._servicePackages = value;
  }

  get serviceProviderCommission(): number {
    return this._serviceProviderCommission;
  }

  set serviceProviderCommission(value: number) {
    this._serviceProviderCommission = value;
  }

  get serviceProviderHasCommission(): number {
    return this._serviceProviderHasCommission;
  }

  set serviceProviderHasCommission(value: number) {
    this._serviceProviderHasCommission = value;
  }

  get serviceProviderName(): string {
    return this._serviceProviderName;
  }

  set serviceProviderName(value: string) {
    this._serviceProviderName = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
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
}
