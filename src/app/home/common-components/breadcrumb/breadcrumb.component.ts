import { Component, Input } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() menu: Item[] = [];
  @Input() separator = '/';
  @Input() style = 'default'; // custom1 | custom2

  getClasses(): any {
    return {
      'custom-1': this.style === 'custom1',
      'custom-2': this.style === 'custom2'
    };
  }
}
