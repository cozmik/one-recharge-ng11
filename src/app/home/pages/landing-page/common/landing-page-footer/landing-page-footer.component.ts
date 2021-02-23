import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../../../shared/Constants';

@Component({
  selector: 'app-landing-page-footer',
  templateUrl: './landing-page-footer.component.html',
  styleUrls: ['./landing-page-footer.component.scss']
})
export class LandingPageFooterComponent implements OnInit {

   vendor: string;
   year: number;

  constructor() { }

  ngOnInit(): void {
    this.vendor = Constants.VENDOR;
    this.year = new Date().getFullYear();
  }

}
