import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../core/services/anonymous-service';
import {StorageService} from '../../../../../core/services/storage-service/storage.service';
import {ToastService} from '../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';
import {Constants} from '../../../../../shared/Constants';

@Component({
  selector: 'app-landing-page-navbar',
  templateUrl: './landing-page-navbar.component.html',
  styleUrls: ['./landing-page-navbar.component.scss']
})
export class LandingPageNavbarComponent implements OnInit {

  navClasses = {
    navigation: true,
    isOpened: false
  };

  public isOpened = false;

  public pageTitle: string;
  public roles: any;
  public isLoggedIn: boolean;
  public isCustomer: boolean;

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public toast: ToastService, public storage: StorageService) {

    this.pageTitle = 'Dashboard';
    this.sharedService.emitChange(this.pageTitle);
    this.isLoggedIn = false;
    this.isCustomer = false;
  }

  getLoginStatus(): void {
    const user = this.storage.getProfile();
    console.log('**** user ****', user);
    if (user  !==  null) {
        console.log('**** userType =  **** ' + user.userType);
        if (user.userType  !==  Constants.CUSTOMER_USERTYPE) {
          this.isLoggedIn = true;
        }
        else {
          this.isCustomer = true;
        }
    }
  }

  goToPage(page?: string): void {

    switch (page){
      case 'sign-in':
        this.router.navigate(['sign-in' ]);
        break;
      case 'agentSignUp':
        this.router.navigate(['agent-signup' ]);
        break;
      case 'sign-up':
        this.router.navigate(['sign-up' ]);
        break;
      default:
        return;
    }
  }

  signOut(): void{
    this.storage.logout();
    this.toast.showInfo('You are logged out successfully', 'Logged Out');
  }

  goToDashboard(): void{
      const userType = this.storage.getProfile().userType;
      // check storage userType and redirect where needed;
      if (userType === Constants.ADMIN_USERTYPE){
        this.router.navigate(['/admin/dashboard']);
      }
      else if (userType === Constants.AGENT_USERTYPE){
        this.router.navigate(['/agent']);
      }
  }

  toggleNav(): void{
    this.navClasses.isOpened = !this.navClasses.isOpened;
    this.isOpened = !this.isOpened;
  }

  ngOnInit(): void {
    this.getLoginStatus();
  }
}
