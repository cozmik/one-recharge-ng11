import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ServiceInterface} from '../../../models/service.model';
import {AddTierComponent} from '../add-tier/add-tier.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {ServiceManagerService} from '../../../views/service-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {NotSavedWarningComponent} from '../not-saved-warning/not-saved-warning.component';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {ServiceFeeInterface} from '../../../models/service-fee.model';

@Component({
  selector: 'app-service-config-sheet',
  templateUrl: './service-config-sheet.component.html',
  styleUrls: [ '../../form-style.scss', './service-config-sheet.component.scss']
})
export class ServiceConfigSheetComponent implements OnInit {
  serviceData: ServiceInterface;
  plusIcon = faPlus;
  loading: boolean;
  testService: ServiceInterface;
  private stillUpdating: boolean;
  bin = faTrashAlt;

  constructor(private bottomSheetRef: MatBottomSheetRef<ServiceConfigSheetComponent>,
              public servService: ServiceManagerService,
              private modal: MatDialog,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {service: ServiceInterface, testService: ServiceInterface} ) { }

  ngOnInit(): void {
    this.serviceData = this.data.service;
    this.testService = this.data.testService;
  }

  toggleData(dataChange): void {
    if (this.serviceData[dataChange]) {
      this.serviceData[dataChange] = 0;
    } else {
      this.serviceData[dataChange] = 1;
    }
  }

  addTier(service: ServiceInterface): void {
    const dialogRef = this.modal.open(AddTierComponent, {
      width: '340px',
      data: {service}
    });

    dialogRef.afterClosed().subscribe((res) => {
      const {serviceFees} = this.serviceData;
      if (res) {
        if (serviceFees.length === 1 && serviceFees[0].upperBound === 0){
          serviceFees[1] = res;
          this.stillUpdating = true;
        } else {
          this.serviceData.serviceFees.push(res);
          this.stillUpdating = true;
        }
      }
    });
  }

  showWarningMessage(): void {
    const dialogRef = this.modal.open(NotSavedWarningComponent, {
      width: '320px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.bottomSheetRef.dismiss(null);
      }
    });
  }

  updateService(): void {
    this.loading = true;
    this.servService.updateService(this.serviceData, () => {
      this.loading = false;
      this.stillUpdating = false;
      this.bottomSheetRef.dismiss('success');
    });
  }

  cancelEdit(): void {
    if (JSON.stringify(this.testService) !== JSON.stringify(this.serviceData)) {
      this.showWarningMessage();
    } else {
      this.bottomSheetRef.dismiss(null);
    }
  }

  deleteTier(fee: ServiceFeeInterface): void {
    this.serviceData.serviceFees = this.testService.serviceFees.filter(d => !((fee.upperBound === d.upperBound)
      && (fee.lowerBound === d.lowerBound)));
  }
}
