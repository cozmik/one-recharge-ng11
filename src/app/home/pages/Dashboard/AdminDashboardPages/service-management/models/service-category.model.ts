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
  categoryCode: string;
  private _categoryLogo: string;
  categoryName: string;
  createdDate: Date;
  description: string;
  id: number;
  private _services: ServiceModel[];
  serviceResponses: ServiceModel[];


  constructor(object: any) {
    this._services = object.serviceResponses;
    this.categoryCode = object.categoryCode;
    this._categoryLogo = object.categoryLogo;
    this.categoryName = object.categoryName;
    this.createdDate = object.createdDate;
    this.description = object.description;
    this.id = object.id;
    this.serviceResponses = object.serviceResponses;
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
