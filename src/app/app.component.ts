import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['../assets/sass/style.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).ga('set', 'page', event.urlAfterRedirects);
        (window as any).ga('send', 'pageview');
      }
    });
  }
}
