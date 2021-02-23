import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {Router} from '@angular/router';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {
  public pageTitle: string;
  public roles: any;
  public isLoadingRoles: boolean;

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService, public router: Router,
              public error: ErrorService, public toast: ToastService) {
    this.getRoles();
    this.pageTitle = 'Manage Role';
    this.sharedService.emitChange(this.pageTitle);
    this.isLoadingRoles = false;
  }

  ngOnInit(): void {
  }


  // get roles
  getRoles = () => {
    this.isLoadingRoles = true;
    this.anonymousService.getRoles().subscribe(
      response => {
        console.log(response);
        this.roles = response;
        this.isLoadingRoles = false;
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getRoles, err);
        console.log(msg);
        this.isLoadingRoles = false;
      }
    );
  }

  editRole(id): void {
    this.router.navigate(['admin/edit-role/', id ]);
  }

  deleteRole = (id) => {
    this.anonymousService.deletRole(id).subscribe(
      data => {
        console.log(data);
        this.getRoles();
        this.toast.showSuccess('Role deleted successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.deleteRole, err);
        this.toast.showError(msg.message, 'Error');
        console.log(msg);
      }
    );
  }

}
