import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {PanelService} from './panel.service';
import {MatDialog} from '@angular/material/dialog';
import {ServiceManagerService} from './views/service-manager.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {

  private closed: boolean;
  @ViewChild('rightPanel', {static: true}) private rightPanel: MatSidenav;

  constructor(
    public panelService: PanelService, public dialog: MatDialog, private smService: ServiceManagerService) {
    this.smService.title.next('');
  }


  ngOnInit(): void {
    this.panelService.panel = this.rightPanel;
  }

  toggleSideNav(): boolean {
    return this.closed = !this.closed;
  }

}
