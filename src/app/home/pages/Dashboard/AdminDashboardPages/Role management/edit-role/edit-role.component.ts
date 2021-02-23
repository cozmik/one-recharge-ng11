import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {ActivatedRoute, Router} from '@angular/router';
import {SortingService} from '../../../../../../shared/services/sort-service/sorting.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  public roleId: number;
  public  sub: any;

  public holdRemovePerm: { id: number, name: string }[] = [];
  public holdActivePerm: { id: number, name: string }[] = [];

  public activePerm: { id: number, name: string }[] = [];
  public inActivePerm: { id: number, name: string }[] = [];

  public selectedPermissions: any[] = [];
  public isLoading: boolean;

  public error: any;
  public message: string;
  public rolesPayload: any = {
    name: '',
    permissions: []
  };
  public roleName: string;
  constructor(public authServices: AuthService, public anonymousService: AnonymousService, public sort: SortingService,
              public activatedRoute: ActivatedRoute, public route: Router, public err: ErrorService,
              public toast: ToastService) {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.roleId = +params.id;
    });
    this.getAllPermissions();
    this.getRole();
    this.isLoading = false;
  }

  ngOnInit(): void {

  }

  selectFromActive(perm): void {
    const dArr = this.holdRemovePerm;
    this.selectFromPerm(perm, dArr);
  }

  selectFromInactive(perm): void {
    const dArr = this.holdActivePerm;
    this.selectFromPerm(perm, dArr);
  }

  addToActive(): void {
    const activePerm = this.activePerm;
    const holdingPerm = this.holdActivePerm;
    const fromPerm = this.inActivePerm;
    this.sort.compareValues('name');
    this.switchPerm(activePerm, holdingPerm, fromPerm);
    // console.log(this.activePerm);
    this.holdActivePerm = [];
  }

  removeFromActive(): void {
    const inActivePerm = this.inActivePerm;
    const holdingPerm = this.holdRemovePerm;
    const fromPerm = this.activePerm;
    this.sort.compareValues('name');

    this.switchPerm(inActivePerm, holdingPerm, fromPerm);
    this.holdRemovePerm = [];
  }

  onSubmit(formData): void {
    const roleName = formData.value.roleName;
    this.isLoading = true;
    this.activePerm.forEach(perm => {
      this.selectedPermissions.push(perm.id);
    });
    this.rolesPayload.name = roleName;
    this.rolesPayload.permissions = this.selectedPermissions;
    console.log(this.selectedPermissions);
    this.updateRoles();

  }

  //////////////////////// Helper functions ///////////////////////////////////////////////////////

  public getRole = () => {
    this.anonymousService.getRole(this.roleId).subscribe(
      response => {
        // console.log("get role function");
        this.roleName = response.name;
        this.activePerm = this.transformText(response.permissions);
        this.sortPerm();
      },
      err => {
        console.log(err);
        const msg = this.err.errorHandlerWithText(this.getRole, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }

  public getAllPermissions = () => {
    this.anonymousService.getPermissions().subscribe(
      response => {
        this.inActivePerm = response;
      },
      err => {
        console.log(err);
      }
    );
  }

  public selectFromPerm(perm, arr): void {
    if (arr.length <= 0) {
      arr.push(perm);
      // console.log(perm);
    } else {
      if (arr.indexOf(perm) === -1) {
        arr.push(perm);
        // console.log(perm)
      } else {
        arr.splice(arr.indexOf(perm), 1);
      }
    }
  }

  public transformText(t: any): any[] {
    const nT: any[] = [];
    // console.log('******** T ***********');
    // console.log(t);
    for (const item of t) {
      const n: any = [{name: '', id: ''}];
      n.name = item.name.replace(/_/g, ' ');
      n.id = item.id;
      nT.push(n);
    }
    // console.log(nT);
    return nT;
  }

  public switchPerm(addArr: object[], remArr: object[], from: object[]): void {
    /////////// Add selected permissions to opposite list permission list /////////////////////////////////////////////
    remArr.forEach(item => {
      addArr.push(item);
    });

    /////////// Remove selected permission from Inactive list ///////////////////////////////////////////////////////
    remArr.forEach(item => {
      from.splice( from.indexOf(item), 1);
    });

  }


  sortPerm(): void {
    if (this.activePerm.length > 0) {
      this.activePerm.forEach(item => {
        const obj = this.inActivePerm.find(o => o.id === item.id);
        this.inActivePerm.splice(this.inActivePerm.indexOf(obj), 1);
      });
      this.inActivePerm = this.transformText(this.inActivePerm);
    }
  }


  updateRoles = () => {
    this.authServices.updateRoles(this.rolesPayload, this.roleId).subscribe(
      response => {
        this.toast.showSuccess('Role updated successfully. Redirecting...', 'Success');
        setTimeout(() => {
          this.route.navigate(['admin/manage-role']);
        }, 2000);
      },
      err => {
        // console.log(err);
        const msg = this.err.errorHandlerWithText(this.updateRoles, err);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }
}
