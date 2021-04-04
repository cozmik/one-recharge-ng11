import {Component, Input, OnInit} from '@angular/core';
import {CustomFormGroup} from '../../../../core/services/shared-service/shared.service';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent implements OnInit {
  @Input() form: CustomFormGroup | AbstractControl | any;

  getIsValid(): boolean {
    this.form.fields.forEach(field => {
      if (this.form.controls[field.key].pristine) {
        return true;
      }
      return this.form.controls[field.key].valid;
    });
    return true;
  }

  ngOnInit(): void {
  }
}
