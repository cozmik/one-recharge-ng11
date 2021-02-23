import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {PanelService} from './panel.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss']
})
export class ServiceManagementComponent implements OnInit {

  private closed: boolean;
  @ViewChild('rightPanel', {static: true}) private rightPanel: MatSidenav;

  constructor(
    public panelService: PanelService, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.panelService.panel = this.rightPanel;
  }

  toggleSideNav(): boolean {
    return this.closed = !this.closed;
  }

}
