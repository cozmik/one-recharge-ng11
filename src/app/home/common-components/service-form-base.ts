export class ServiceFormBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: any = {}) {
    this.value = options.value;
    this.key = options.field || '';
    this.label = options.title || '';
    this.required = !options.optional;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.type  !==  'dropdown' ? 'textbox': 'dropdown';
    this.type = (options.type === 'double' || options.type === 'int') ? 'number' : 'text';
    this.options = options.options || [];
  }
}
