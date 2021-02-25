import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../core/services/shared-service/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageTitle: any;
  rtl = false;
  @Input() openedSidebar = false;

  constructor(public router: Router, public sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe(
      title => {
        this.pageTitle = title;
      });
  }

  ngOnInit(): void { }

  getClasses(): any {
    return {
      'open-sidebar': this.openedSidebar,
      rtl: this.rtl
    };
  }

  sidebarState(): any {
    this.openedSidebar = !this.openedSidebar;
  }
}
