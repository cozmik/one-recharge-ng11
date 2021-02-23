import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {

  @Input() type: string;
  @Input() textObject: object;
  @Input() title: string;
  @Input() multiple: boolean;
  @Input() fadeOut: boolean;
  customAlertClasses: any;


  constructor() { }

  ngOnInit(): void {
    console.log('type : ' + this.type);
    if (this.type.length === 0){
       this.type = 'danger';
     }

    this.customAlertClasses = {
        'custom-alert' : true,
        fadeOut : this.fadeOut,
        fadeIn : !this.fadeOut,
        'custom-alert-danger' : this.type === 'danger',
        'custom-alert-success' : this.type === 'success',
        'custom-alert-warning' : this.type === 'warning',
        'custom-alert-info' : this.type === 'info'
      };

    console.log(this.customAlertClasses);
    console.log(this.textObject);
    console.log(this.multiple);
  }

}
