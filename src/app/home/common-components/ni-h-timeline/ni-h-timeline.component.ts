import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ni-h-timeline',
  templateUrl: './ni-h-timeline.component.html',
  styleUrls: ['./ni-h-timeline.component.scss'],
  host: {
    '[class.ni-h-timeline]': 'true',
    '[class.show-years]': 'showYears',
    '[class.show-date]': 'showDate'
  }
})
export class NIHTimelineComponent implements OnInit {
  @Input() showYears = false;
  @Input() showDate = true;
  @Input() align = 'left';
  @Input() style: any = '';
  @Input() data: any[] = [];

  @HostBinding('class.align-left') alignLeft = false;
  @HostBinding('class.align-center') alignCenter = false;
  @HostBinding('class.align-right') alignRight = false;
  @HostBinding('class.align-between') alignBetween = false;

  constructor() { }

  ngOnInit(): void {
    this.alignLeft = (this.align === 'left');
    this.alignCenter = (this.align === 'center');
    this.alignRight = (this.align === 'right');
    this.alignBetween = (this.align === 'between');
  }
}
