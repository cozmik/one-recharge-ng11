/**
 * Created by Anthony on 30/05/2018.
 */
export class AgentNetworkConfig {
  get superConfig(): Config[] {
    return this._superConfig;
  }

  get config(): Config[] {
    return this._config;
  }

  private _superConfig: Config[];
  private _config: Config[];

  constructor( obj: any) {
    this._superConfig = obj.superConfig;
    this._config = obj.config;
  }
}

export class Config {
  get commission(): number {
    return this._commission;
  }

  get networkId(): number {
    return this._networkId;
  }

  get networkName(): string {
    return this._networkName;
  }

  get isPersonalConfig(): number {
    return this._isPersonalConfig;
  }

  get network(): Network {
    return this._network;
  }

  private _commission: number;
  private _networkId: number;
  private _networkName: string;
  private _isPersonalConfig: number;
  private _network: Network;

  constructor(obj: any) {
    this._commission = obj.commission;
    this._networkId = obj.networkId;
    this._networkName = obj.networkName;
    this._isPersonalConfig = obj.isPersonalConfig;
    this._network = obj.network;
  }

}

export interface Network {
  id: number;
  networkName: string;
  networkCodeName: string;
  networkLogo: string;
  isAirtimeActive: boolean;
  isDataActive: boolean;
  createdDate: string;
  updatedDate: string;
}
