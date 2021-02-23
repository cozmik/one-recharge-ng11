import {ServiceModel} from './service.model';
import {Constants} from '../../../../../../shared/Constants';

export interface CategoryInterface {
  categoryCode: string;
  categoryLogo: string;
  categoryName: string;
  createdDate: Date;
  description: string;
  id: number;
  serviceResponses: ServiceModel[];
}

export class ServiceCategoryModel implements CategoryInterface {
  serviceUrl = Constants.SERVICE_URL + '/';
  private _categoryCode: string;
  private _categoryLogo: string;
  private _categoryName: string;
  private _createdDate: Date;
  private _description: string;
  private _id: number;
  private _services: ServiceModel[];
  serviceResponses: ServiceModel[];


  constructor(object: any) {
    this._services = object.serviceResponses;
    this._categoryCode = object.categoryCode;
    this._categoryLogo = object.categoryLogo;
    this._categoryName = object.categoryName;
    this._createdDate = object.createdDate;
    this._description = object.description;
    this._id = object.id;
  }


  get categoryCode(): string {
    return this._categoryCode;
  }

  set categoryCode(value: string) {
    this._categoryCode = value;
  }

  get categoryLogo(): string {
    if (!this._categoryLogo) {
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMC44NDkiIGhlaWdodD0iMjUuMDY0IiB2aWV3Qm94PSIwIDAgMzAuODQ5IDI1LjA2NCI+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9IjA4ZzRiamZ5cGEiIHgxPSIuNSIgeDI9Ii41IiB5Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZmE0ZDIiIHN0b3Atb3BhY2l0eT0iLjYiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzA1MjY5Ii8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGZpbGw9InVybCgjMDhnNGJqZnlwYSkiIGQ9Ik0yNy42MzUgMzAuODQ5bDUuNzg0LTE1LjQyNEg4LjM1NUwyLjU3MSAzMC44NDl6TTYuNDI3IDEzLjVMMi41NzEgMzAuODQ5VjUuNzg0aDguNjc2TDE1LjEgOS42NGgxMi41MzV2My44NnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yLjU3MSAtNS43ODQpIi8+Cjwvc3ZnPgo=';
    } else {
      return this.serviceUrl + this._categoryLogo;
    }
  }

  set categoryLogo(value: string) {
    this._categoryLogo = value;
  }

  get imagePath(): string {
    if (!this._categoryLogo) {
      return 'assets/img/no-image.png';
    } else {
      return this._categoryLogo;
    }
  }

  get categoryName(): string {
    return this._categoryName;
  }

  set categoryName(value: string) {
    this._categoryName = value;
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

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get services(): ServiceModel[] {
    const serv = [];
    this._services.forEach(sv => {
      serv.push(new ServiceModel(sv));
    });
    return serv;
  }

  set services(value: ServiceModel[]) {
    this._services = value;
  }
}
