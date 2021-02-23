import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() color = '';
  @Input() customColor = '';
  @Input() outline = false;
  @Input() close = false;

  delete(event: any, alert: any): void {
    event.preventDefault();

    alert.remove();
  }
}
