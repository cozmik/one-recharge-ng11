import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceModel} from '../../../models/service.model';

@Component({
  selector: 'app-commission-list-modal',
  templateUrl: './commission-list-modal.component.html',
  styleUrls: ['./commission-list-modal.component.scss', '../modal-styles.scss']
})
export class CommissionListModalComponent implements OnInit {
  service: ServiceModel;

  constructor(public dialogRef: MatDialogRef<CommissionListModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {service: ServiceModel}) {
    this.service = data.service;
  }

  ngOnInit(): void {
  }

}
