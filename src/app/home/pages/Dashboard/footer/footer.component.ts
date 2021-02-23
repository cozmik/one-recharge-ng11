import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../../shared/Constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public vendorTitle: string = Constants.VENDOR;
  public version: string = Constants.VERSION;
  public year: number;

  constructor() {
  this.year = new Date().getFullYear();
}

  ngOnInit(): void { }
}
