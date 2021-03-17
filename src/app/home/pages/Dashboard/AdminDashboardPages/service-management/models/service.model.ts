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
  meta: MetaData;
  superAgentCommission: number;
  systemCommission: number;
}

export class ServiceModel implements ServiceInterface{

  serviceUrl = Constants.SERVICE_URL + '/';

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
  serviceCategory: ServiceCategoryModel;
  serviceCode: string;
  serviceFees: ServiceFee[];
  private _serviceLogo: string;
  serviceName: string;
  meta: MetaData;
  servicePackages: ServicePackageModel[];
  serviceProviderCommission: number;
  serviceProviderHasCommission: number;
  serviceProviderName: string;
  status: number;
  superAgentCommission: number;
  systemCommission: number;

  constructor(object: any) {
    this.agentCommission = object.agentCommission;
    this.convenienceFee = object.convenienceFee;
    this.createdDate = object.createdDate;
    this.description = object.description;
    this.feeType = object.feeType;
    this.hasConvenienceFee = object.hasConvenienceFee;
    this.hasFee = object.hasFee;
    this.hasProducts = object.hasProducts;
    this.id = object.id;
    this.isCommissionFixed = object.isCommissionFixed;
    this.isCommissionFromAmount = object.isCommissionFromAmount;
    this.isCommissionPerFee = object.isCommissionPerFee;
    this.isDownLineCommissionFixed = object.isDownLineCommissionFixed;
    this.isServiceProviderCommissionFixed = object.isServiceProviderCommissionFixed;
    this.isUpLineCommissionFixed = object.isUpLineCommissionFixed;
    this.serviceCategory = object.serviceCategory;
    this.serviceCode = object.serviceCode;
    this.meta = object.meta;
    this.serviceFees = object.serviceFees;
    this._serviceLogo = object.serviceLogo;
    this.serviceName = object.serviceName;
    this.servicePackages = object.servicePackages;
    this.serviceProviderCommission = object.serviceProviderCommission;
    this.serviceProviderHasCommission = object.serviceProviderHasCommission;
    this.serviceProviderName = object.serviceProviderName;
    this.status = object.status;
    this.superAgentCommission = object.superAgentCommission;
    this.systemCommission = object.systemCommission;
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
}


export interface MetaData {
  confirmationUrl: string;
  fields: Array<{
    description: string;
    field: string;
    formFields: null
    optional: boolean;
    options: any;
    title: string;
    type: string;
  }>;
  guestUrl: string;
  hasConfirmation: boolean;
  url: string;
}

