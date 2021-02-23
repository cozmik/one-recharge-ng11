import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../../../../../core/services/anonymous-service';
import {UserService} from '../../../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public userId: number;
  public permissions: any;

  constructor(public sharedService: SharedService, public router: Router, public anonymousService: AnonymousService,
              public agentService: UserService, public activatedRoute: ActivatedRoute, public error: ErrorService) {
    this.activatedRoute.parent.params.subscribe(params => {
      this.userId = +params['id'];
    });
    this.getUserPermission();
  }

  ngOnInit(): void {
  }

  // get all agents info
  getUserPermission() {
    this.agentService.getUserPermission(this.userId).subscribe(
      data => {
        console.log(data);
        this.permissions = data.userPermissions;
      },
      err => {
        const errMess = this.error.errorHandlerWithText(this.getUserPermission, err);
        console.log(err);
      }
    )
  }
}
