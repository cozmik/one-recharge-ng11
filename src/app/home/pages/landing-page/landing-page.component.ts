import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../../../assets/sass/style.scss']
})
export class LandingPageComponent implements OnInit {

  rtl = false;
  constructor( ) { }

  ngOnInit(): void {
  }

}
