import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {ServiceStoreService} from './AdminDashboardPages/service-management/store/service-store.service';
import {ServiceManagerService} from './AdminDashboardPages/service-management/views/service-manager.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageTitle: any;
  rtl = false;
  @Input() openedSidebar = false;

  constructor(public router: Router, public sharedService: SharedService, private smStore: ServiceStoreService,
              private smService: ServiceManagerService) {
    sharedService.changeEmitted$.subscribe(
      title => {
        this.pageTitle = title;
      });
  }

  ngOnInit(): void {
    if (!this.smStore.allCategories.length){
      this.smService.getAllServicesByCategories();
    }
  }

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
