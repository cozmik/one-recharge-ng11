import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceInterface, ServiceModel} from '../../../models/service.model';
import {ServiceManagerService} from '../../../views/service-manager.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

@Component({
  selector: 'app-quick-config-modal',
  templateUrl: './quick-config-modal.component.html',
  styleUrls: ['./quick-config-modal.component.scss', '../../form-style.scss', '../modal-styles.scss']
})
export class QuickConfigModalComponent implements OnInit {
  service: ServiceInterface;
  commission: number;
  spinner = faSpinner;
  updating: boolean;

  constructor(
    public dialogRef: MatDialogRef<QuickConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {service: ServiceModel},
    private smService: ServiceManagerService) {
    this.service = data.service;
    console.log(data);
    this.commission = this.service.systemCommission;
  }

  ngOnInit(): void {
  }

  quickUpdate(): void {
    this.updating = true;
    const service = {
      ...this.service,
      categoryId: this.service.serviceCategory.id,
      systemCommission: this.commission,
      superAgentCommission: 100 - this.commission
    };
    this.smService.updateService(service, () => {
      this.updating = false;
      this.dialogRef.close();
    });
  }
}
