import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo-2',
  templateUrl: './logo-2.component.html',
  styleUrls: ['./logo-2.component.scss']
})
export class Logo2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(page?: string): void {

    switch (page){
      case 'landingPage':
        this.router.navigate(['']);
        break;
      case 'sign-in':
        this.router.navigate(['sign-in' ]);
        break;
      case 'agentSignUp':
        this.router.navigate(['signin' ]);
        break;
      case 'customerSignUp':
        this.router.navigate(['signin' ]);
        break;
      default:
        return;
    }
  }

}
