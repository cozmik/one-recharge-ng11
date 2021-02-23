import {Component, OnInit, ViewChild} from '@angular/core';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {MatSlider} from '@angular/material/slider';
import {Agent} from '../../../../../../core/mocks/user/agent.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  pageTitle: string;

  public userData: any;
  public superAgentId: number;
  public blockingText: string;
  public userId: number;
  public isBlocked: any;
@ViewChild('slider') slider: MatSlider;

  constructor(public sharedService: SharedService, public router: Router, public anonymousService: AnonymousService,
              public agentService: UserService, public activatedRoute: ActivatedRoute, public error: ErrorService ) {
    this.pageTitle = 'Account';
    this.sharedService.emitChange(this.pageTitle);
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params.id;
    });

    this.getUser();
  }


  ngOnInit(): void {}


  toggleBlockUser(): void {
    if (this.isBlocked) {
      this.blockUser();
    } else {
      this.unBlockUser();
    }
  }

  // block user
  blockUser = () => {
    const userId = this.userId;
    console.log('Block user:' + userId);
    this.blockingText = 'Blocking user...';
    this.agentService.blockUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.blockingText = 'blocked';
        this.isBlocked = false;
      },
      err => {
        console.log(err);
        const errMsg = this.error.errorHandlerWithText(this.blockUser, err);
        console.log(errMsg.message);
      }
    );
  }

// Unblock user
  unBlockUser = () => {
    const userId = this.userId;
    this.blockingText = 'Unblocking ...';
    console.log('Block user:' + userId);
    this.agentService.unblockUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.blockingText = 'Active';
        this.isBlocked = true;
      },
      err => {
        const errMsg = this.error.errorHandlerWithText(this.unBlockUser, err);
        console.log(errMsg.message);
      }
    );
  }

  public getUser = () => {
    this.anonymousService.getUser(this.userId).subscribe(
      data => {
        this.userData = new Agent(data);
        if (this.userData.disabled) {
          this.blockingText = 'Blocked';
          this.isBlocked = false;
        } else {
          this.blockingText = 'Active';
          this.isBlocked = true;
        }
      },
      err => {
        this.error.errorHandlerWithText(this.getUser, err);
      }
    );
  }

  //
  // viewProfile() {
  //   this.selectedMenu = 'two';
  //   this.router.navigate(['admin/agent/' +  this.userId + '/view-profile/']);
  // }
  //
  // viewAgents() {
  //   this.selectedMenu = 'three';
  //   this.router.navigate(['admin/agent/' +  this.userId + '/user-agents/']);
  // }
  //
  // userPermission() {
  //   this.selectedMenu = 'four';
  //   this.router.navigate(['admin/agent/' +  this.userId + '/permissions/']);
  // }

}
