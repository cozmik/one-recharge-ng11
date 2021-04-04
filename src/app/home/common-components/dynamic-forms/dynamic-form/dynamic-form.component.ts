import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServiceFormBase} from '../../service-form-base';
import {CustomFormGroup} from '../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() package: any;
  @Input() form: CustomFormGroup;
  @Output() submitData = new EventEmitter();
  payLoad = '';
  @Input() isLoading = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.form);
    this.createForm(this.form, this.package);
  }

  onSubmit(): void {
    this.submitData.emit(this.form.value);
  }

  createForm(form: CustomFormGroup, pack: any): void {
    if (pack && pack.amount) {
      if (!form.fields.find(f => f.key === 'amount')) {
        form.fields.push(new ServiceFormBase<string>({
          value: pack.amount,
          field: 'amount',
          title: 'Amount',
          type: 'textbox',
        }));
        this.form.addControl('amount', new FormControl(pack.amount));
        this.form.controls.amount.disable();
      }
    }
  }
}
