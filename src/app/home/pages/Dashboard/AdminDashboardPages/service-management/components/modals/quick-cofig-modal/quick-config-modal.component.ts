import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceInterface, ServiceModel} from '../../../models/service.model';
import {ServiceManagerService} from '../../../views/service-manager.service';

@Component({
  selector: 'app-quick-config-modal',
  templateUrl: './quick-config-modal.component.html',
  styleUrls: ['./quick-config-modal.component.scss', '../../form-style.scss', '../modal-styles.scss']
})
export class QuickConfigModalComponent implements OnInit {
  service: ServiceInterface;
  commission: number;

  constructor(
    public dialogRef: MatDialogRef<QuickConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {service: ServiceModel},
    private smService: ServiceManagerService) {
    this.service = data.service;
    this.commission = this.service.systemCommission;
  }

  ngOnInit(): void {
  }

  quickUpdate(): void {
    const service = {
      ...this.service,
      systemCommission: this.commission,
      superAgentCommission: 100 - this.commission
    };
    this.smService.updateService(service, () => {
      this.dialogRef.close();
    });
  }
}
