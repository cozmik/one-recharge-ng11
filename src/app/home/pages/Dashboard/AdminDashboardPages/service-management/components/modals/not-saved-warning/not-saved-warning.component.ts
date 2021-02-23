import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';

@Component({
  selector: 'app-not-saved-warning',
  templateUrl: './not-saved-warning.component.html',
  styleUrls: ['../modal-styles.scss', './not-saved-warning.component.scss']
})
export class NotSavedWarningComponent implements OnInit {

  alertSign = faExclamation;
  constructor(public dialogRef: MatDialogRef<NotSavedWarningComponent>) { }

  ngOnInit(): void {
  }

}
