import {CustomFormGroup, SharedService} from '../../core/services/shared-service/shared.service';

export class ServiceFormBase<T> {
  get formFields(): ServiceFormBase<T>[] | null {
    let f = null;
    if (this._formFields) {
      f = [];
      this._formFields.forEach((field: any) => {
        f.push(new ServiceFormBase(field));
      });
      console.log(f);
    }
    return f;
  }

  set formFields(value: ServiceFormBase<T>[] | null) {
    this._formFields = value;
  }

  value: T;
  key: string;
  label: string;
  required: boolean;
  private _formFields: ServiceFormBase<T>[];
  order: number;
  controlType: string;
  form: ServiceFormBase<any>;
  type: string;
  options: { key: string, value: string }[];

  constructor(options: any = {}) {
    this.value = options.value;
    this.key = options.field || '';
    this.label = options.title || '';
    this.required = !options.optional;
    this._formFields = options.formFields;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.type.toLowerCase() === 'dropdown' ? 'dropdown' : options.type.toLowerCase() === 'form' ? 'form' : 'textbox';
    this.type = (options.type === 'double' || options.type === 'int') ? 'number' : 'text';
    this.options = options.options || [];
  }
}
