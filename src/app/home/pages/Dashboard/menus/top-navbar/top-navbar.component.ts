import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import {Constants} from '../../../../../shared/Constants';
import {AuthService} from '../../../../../core/authentication/auth-service.service';

@Component({
  selector: 'navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Input() openedSidebar = false;
  @Output() sidebarState = new EventEmitter();
  public profile: any;
  public fullName: string;

  constructor( public router: Router, public authService: AuthService) {
    if (JSON.parse(localStorage.getItem(Constants.PROFILE)) !== null) {
      console.log(' *******profile*******');
      this.profile = JSON.parse(localStorage.getItem(Constants.PROFILE));
      console.log(this.profile);
      if (this.profile) {
        this.fullName = this.profile.lastName + ' ' + this.profile.firstName;
      } else {
        router.navigate(['/sign-in']);
      }
    }
  }

  open(event): void {
    const clickedComponent = event.target.closest('.nav-item');
    const items = clickedComponent.parentElement.children;

    for (const item of items) {
      item.classList.remove('opened');
    }
    clickedComponent.classList.add('opened');
  }

  close(event): void {
    const clickedComponent = event.target;
    const items = clickedComponent.parentElement.children;

    for (const item of items) {
      item.classList.remove('opened');
    }
  }

  changePassword(): void {
    this.router.navigate(['admin/change-password']);
  }

  logout(): void {
   this.authService.logout();
  }

  openSidebar(): void {
    this.openedSidebar = !this.openedSidebar;
    this.sidebarState.emit();
  }

  ngOnInit(): void { }
}
