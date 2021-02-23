export class FlutterWaveResponse {
  data:    DataObj;
  name:    string;
  success: boolean;
  tx:      any;
  constructor(data: DataObj, name: string, success: boolean, tx: any) {
    this.data = data;
    this.name = name;
    this.success = success;
    this.tx = tx;
  }
}


export interface Customer {
  id:            number;
  phone:         string;
  fullName:      string;
  customertoken: null;
  email:         string;
  updatedAt:     string;
}

export interface DataObj {
  data: DataData;
  tx:   DataTx;
}

export interface DataData {
  responsecode:    string;
  responsemessage: string;
}

export interface DataTx {
  AccountId:             number;
  IP:                    string;
  acctvalrespcode:       null;
  acctvalrespmsg:        null;
  amount:                number;
  appfee:                number;
  authModelUsed:         string;
  authurl:               string;
  chargeResponseCode:    string;
  chargeResponseMessage: string;
  chargeToken:           any;
  charge_type:           string;
  charged_amount:        number;
  createdAt:             string;
  currency:              string;
  customer:              Customer;
  customerId:            number;
  cycle:                 string;
  deletedAt:             null;
  device_fingerprint:    string;
  flwRef:                string;
  fraud_status:          string;
  id:                    number;
  is_live:               number;
  merchantbearsfee:      number;
  merchantfee:           number;
  modalauditid:          string;
  narration:             string;
  orderRef:              string;
  paymentId:             number;
  paymentPage:           null;
  paymentPlan:           null;
  paymentType:           string;
  raveRef:               string;
  redirectUrl:           string;
  settlement_token:      null;
  status:                string;
  txRef:                 string;
  updatedAt:             string;
  vbvrespcode:           string;
  vbvrespmessage:        string;
}

