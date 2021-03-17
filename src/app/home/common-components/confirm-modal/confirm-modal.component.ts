import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {message: string, title: string}) { }

  ngOnInit(): void {
  }

}
