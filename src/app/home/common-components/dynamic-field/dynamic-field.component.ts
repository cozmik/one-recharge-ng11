import {Component, Input, OnInit} from "@angular/core";
import {ServiceFormBase} from "../service-form-base";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent {
  @Input() field: ServiceFormBase<string>;
  @Input() form: FormGroup;
  getIsValid(): boolean {
    if (this.form.controls[this.field.key].pristine){
      return true;
    }
    return this.form.controls[this.field.key].valid;
  }
}
