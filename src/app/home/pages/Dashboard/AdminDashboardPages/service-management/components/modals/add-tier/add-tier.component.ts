import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceInterface} from '../../../models/service.model';
import {ServiceFee, ServiceFeeInterface} from '../../../models/service-fee.model';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['../../form-style.scss', './add-tier.component.scss', '../modal-styles.scss']
})
export class AddTierComponent implements OnInit {
  tier: ServiceFeeInterface;
  count: number;
  tiers: ServiceFeeInterface[];
  service: ServiceInterface;
  private lastTier: ServiceFeeInterface;

  constructor(public dialogRef: MatDialogRef<AddTierComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { service: ServiceInterface }) {
    this.tiers = data.service.serviceFees;
    this.service = data.service;
    this.count = this.tiers.length;
    if (this.count) {
      this.lastTier = this.service.serviceFees[this.count - 1];
    }
  }

  ngOnInit(): void {
    this.setUpNextTire();
  }

  setUpNextTire(): void {
    if (this.count) {
      const tierDiff = this.lastTier.upperBound - this.lastTier.lowerBound;
      let currUpper = +tierDiff + +this.lastTier.upperBound.valueOf();
      if (this.count > 1){
        currUpper += 1;
      }
      this.tier = {
        feeAmount: this.lastTier.feeAmount,
        isFeePercentage: this.lastTier.isFeePercentage,
        isSuperAgentCommissionFixed: this.lastTier.isSuperAgentCommissionFixed,
        isSystemCommissionFixed: this.lastTier.isSystemCommissionFixed,
        lowerBound: +this.lastTier.upperBound + 1,
        superAgentCommission: 0,
        systemCommission: 0,
        upperBound: currUpper
      };
    } else {
      this.tier = {
        feeAmount: 0,
        isFeePercentage: 0,
        isSuperAgentCommissionFixed: 0,
        isSystemCommissionFixed: 0,
        lowerBound: 0,
        superAgentCommission: 0,
        systemCommission: 0,
        upperBound: 0
      };
    }
  }

  addTier(): void {
    this.tier.isSuperAgentCommissionFixed = this.tier.isSystemCommissionFixed;
    if (!this.tier.isSystemCommissionFixed) {
      this.tier.superAgentCommission = 100 - this.tier.systemCommission;
    } else {
      this.tier.superAgentCommission = this.tier.feeAmount - this.tier.systemCommission;
    }
    this.dialogRef.close(this.tier);
  }
}
