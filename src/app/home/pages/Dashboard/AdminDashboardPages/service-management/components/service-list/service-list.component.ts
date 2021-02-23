import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuickConfigModalComponent} from '../modals/quick-cofig-modal/quick-config-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ServiceInterface, ServiceModel} from '../../models/service.model';
import {CommissionListModalComponent} from '../modals/commission-list-modal/commission-list-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceManagerService} from '../../views/service-manager.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {

  @Input() serviceInterface: ServiceInterface;
  spinner = faSpinner;
  loading: boolean;
  status: number;
  service: ServiceModel;

  constructor(public dialog: MatDialog,
              private router: Router,
              public sanitizer: DomSanitizer,
              private route: ActivatedRoute, private sms: ServiceManagerService) { }

  ngOnInit(): void {
    this.service = new ServiceModel(this.serviceInterface);
    this.status = this.service.status;
  }


  quickConfig(service: ServiceInterface): void {
    const dialogRef = this.dialog.open(QuickConfigModalComponent, {
      width: '350px',
      data: {service}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCommissionList(service: ServiceModel): void {
    const dialogRef = this.dialog.open(CommissionListModalComponent, {
      width: '650px',
      data: {service}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  gotoService(): void {
    this.sms.selectedService.next(this.service);
    this.router.navigate(['./service/' + this.service.id], {relativeTo: this.route});
  }

  toggleActivation(service: ServiceModel): void {
    this.loading = true;
    this.sms.toggleActivation(service.id, service.status, () => { this.loading = false; });
  }
}
