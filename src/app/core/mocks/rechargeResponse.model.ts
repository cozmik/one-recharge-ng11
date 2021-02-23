/**
 * Created by Anthony on 23/05/2018.
 */
export class RechargeResponse {

  id?:                   number;
  firstName?:            string;
  lastName?:             string;
  email?:                string;
  fromType?:             string;
  toType?:               string;
  userId?:               number;
  transactionType?:      string;
  transactionId?:        string;
  amount?:               number;
  commission?:           number;
  paymentRef?:           string;
  description?:          string;
  networkName?:          string;
  networkId?:            number;
  networkCodeName?:      null;
  toMsisdn?:             string;
  status?:               number;
  paymentStatus?:        number;
  channel?:              string;
  vendSessionId?:        string;
  vendRefNo?:            string;
  agentWalletType?:      null;
  retries?:              number;
  isRetriedTransaction?: number;
  retriedTransactionId?: null;
  isRetrySuccessful?:    number;
  isRefunded?:           number;
  createdDate?:          number;
  updatedDate?:          null;

  constructor( obj : any) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.fromType = obj.fromType;
    this.toType = obj.toType;
    this.userId = obj.userId;
    this.transactionType = obj.transactionType;
    this.transactionId = obj.transactionId;
    this.amount = obj.amount;
    this.commission = obj.commission;
    this.paymentRef = obj.paymentRef;
    this.description = obj.description;
    this.networkName = obj.networkName;
    this.networkId = obj.networkId;
    this.networkCodeName = obj.networkCodeName;
    this.toMsisdn = obj.toMsisdn;
    this.status = obj.status;
    this.paymentStatus = obj.paymentStatus;
    this.channel = obj.channel;
    this.vendSessionId = obj.vendSessionId;
    this.vendRefNo = obj.vendRefNo;
    this.agentWalletType = obj.agentWalletType;
    this.retries = obj.retries;
    this.isRetriedTransaction = obj.isRetriedTransaction;
    this.retriedTransactionId = obj.retriedTransactionId;
    this.isRetrySuccessful = obj.isRetrySuccessful;
    this.isRefunded = obj.isRefunded;
    this.createdDate = obj.createdDate;
    this.updatedDate = obj.updatedDate;
  }
}


// {
//   "id": 26,
//   "firstName": "Anthony",
//   "lastName": "Joseph",
//   "email": "aagbator@swifta.com",
//   "fromType": "CUSTOMER",
//   "toType": "GUEST",
//   "userId": 9,
//   "transactionType": "AIRTIME_TRANSFER",
//   "transactionId": "1111111111111111",
//   "amount": 50,
//   "commission": 0,
//   "paymentRef": "111",
//   "description": "Vend Success",
//   "networkName": "9mobile",
//   "networkId": 3,
//   "networkCodeName": null,
//   "toMsisdn": "09090016123",
//   "status": 1,
//   "paymentStatus": 1,
//   "channel": "MOBILE",
//   "vendSessionId": "280959",
//   "vendRefNo": "32",
//   "agentWalletType": null,
//   "retries": 0,
//   "isRetriedTransaction": 0,
//   "retriedTransactionId": null,
//   "isRetrySuccessful": 0,
//   "isRefunded": 0,
//   "createdDate": 1527071211200,
//   "updatedDate": null
// }
