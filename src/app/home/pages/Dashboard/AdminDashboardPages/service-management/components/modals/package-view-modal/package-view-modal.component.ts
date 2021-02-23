import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServicePackageModel} from '../../../models/service-package.model';
import {ServiceManagerService} from '../../../views/service-manager.service';

@Component({
  selector: 'app-package-view-modal',
  templateUrl: './package-view-modal.component.html',
  styleUrls: ['../modal-styles.scss', '../../form-style.scss', './package-view-modal.component.scss']
})
export class PackageViewModalComponent implements OnInit {
  servicePackage: ServicePackageModel;
  editPackage: boolean;
  packageData: {
    amount: number,
    name: string,
    description: string
  };
  isLoading: boolean;
  private readonly serviceId: number;

  constructor(public dialogRef: MatDialogRef<PackageViewModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {servicePackage: ServicePackageModel},
              private managerService: ServiceManagerService) {
    this.servicePackage = data.servicePackage;
    this.editPackage = false;
  }

  ngOnInit(): void {
    const {amount, fee, name, description} = this.servicePackage;
    this.packageData = {
      amount,
      name,
      description
    };
  }

  update(): void {
    this.isLoading = true;
    this.managerService.updateServicePackage(this.servicePackage.id, this.packageData, () => {
      this.isLoading = false;
      this.dialogRef.close(null);
    });
  }
}
