/**
 * Created by Anthony on 11/05/2018.
 */

export class UserTransactionStatistics {
  get successfulNonWalletTransactions(): number {
    return this._successfulNonWalletTransactions;
  }

  get successfulTran(): number {
    return this._successfulTran;
  }

  get failedDataTransactions(): number {
    return this._failedDataTransactions;
  }

  get failedNonWalletTransactions(): number {
    return this._failedNonWalletTransactions;
  }

  get pendingDataTransactions(): number {
    return this._pendingDataTransactions;
  }

  get pendingAirtimeTrans(): number {
    return this._pendingAirtimeTrans;
  }

  get pendingTrans(): number {
    return this._pendingTrans;
  }

  get failedAirtimeTrans(): number {
    return this._failedAirtimeTrans;
  }

  get nonWalletTransactions(): number {
    return this._nonWalletTransactions;
  }

  get walletTrans(): number {
    return this._walletTrans;
  }

  get successfulAirtimeTrans(): number {
    return this._successfulAirtimeTrans;
  }

  get successfulDataTransactions(): number {
    return this._successfulDataTransactions;
  }

  get airtimeTrans(): number {
    return this._airtimeTrans;
  }

  get dataTransactions(): number {
    return this._dataTransactions;
  }

  get pendingNonWalletTransactions(): number {
    return this._pendingNonWalletTransactions;
  }

  get failedTrans(): number {
    return this._failedTrans;
  }

  get transactionCount(): number {
    return this._transactionCount;
  }


  private _successfulNonWalletTransactions: number;
  private _successfulTran:                  number;
  private _failedDataTransactions:          number;
  private _failedNonWalletTransactions:     number;
  private _pendingDataTransactions:         number;
  private _pendingAirtimeTrans:             number;
  private _pendingTrans:                    number;
  private _failedAirtimeTrans:              number;
  private _nonWalletTransactions:           number;
  private _walletTrans:                     number;
  private _successfulAirtimeTrans:          number;
  private _successfulDataTransactions:      number;
  private _airtimeTrans:                    number;
  private _dataTransactions:                number;
  private _pendingNonWalletTransactions:    number;
  private _failedTrans:                     number;
  private _transactionCount:                number;


  constructor( obj: any) {
    this._successfulNonWalletTransactions = obj.successfulNonWalletTransactions;
    this._successfulTran = obj.successfulTran;
    this._failedDataTransactions = obj.failedDataTransactions;
    this._failedNonWalletTransactions = obj.failedNonWalletTransactions;
    this._pendingDataTransactions = obj.pendingDataTransactions;
    this._pendingAirtimeTrans = obj.pendingAirtimeTrans;
    this._pendingTrans = obj.pendingTrans;
    this._failedAirtimeTrans = obj.failedAirtimeTrans;
    this._nonWalletTransactions = obj.nonWalletTransactions;
    this._walletTrans = obj.walletTrans;
    this._successfulAirtimeTrans = obj.successfulAirtimeTrans;
    this._successfulDataTransactions = obj.successfulDataTransactions;
    this._airtimeTrans = obj.airtimeTrans;
    this._dataTransactions = obj.dataTransactions;
    this._pendingNonWalletTransactions = obj.pendingNonWalletTransactions;
    this._failedTrans = obj.failedTrans;
    this._transactionCount = obj.transactionCount;
  }
}

