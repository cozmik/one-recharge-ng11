import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ServiceFormBase} from '../../service-form-base';
import {SharedService} from '../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit{
  @Input() fields: ServiceFormBase<string>[] = [];
  @Input() form: FormGroup;
  @Output() submitData = new EventEmitter();
  payLoad = '';
  @Input() isLoading = false;

  constructor() {  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitData.emit(this.form.value);
  }

}
