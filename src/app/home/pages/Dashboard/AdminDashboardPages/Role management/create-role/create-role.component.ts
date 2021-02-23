import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {SortingService} from '../../../../../../shared/services/sort-service/sorting.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  pageTitle: string;
  public editId: number;
  public  sub: any;

  public holdRemovePerm: { id: number, name: string }[] = [];
  public holdActivePerm: { id: number, name: string }[] = [];

  public activePerm: { id: number, name: string }[] = [];
  public inActivePerm: { id: number, name: string }[] = [];

  public selectedPermissions: any[] = [];
  public roleName: any;
  public isLoading: boolean;

  public message: string;
  public rolesPayload: any = {
    name: '',
    permissions: []
  };
  constructor(public authServices: AuthService, public anonymousService: AnonymousService, public sharedService: SharedService,
              public error: ErrorService, public sort: SortingService, public toast: ToastService) {
    this.getAllPermissions();
    this.isLoading = false;
    this.pageTitle = 'Create Role';
    this.sharedService.emitChange(this.pageTitle);
  }

  ngOnInit(): void {}

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
    this.switchPerm(activePerm, holdingPerm, fromPerm);
    console.log(this.activePerm);
    this.holdActivePerm = [];
  }

  removeFromActive(): void {
    const inActivePerm = this.inActivePerm;
    const holdingPerm = this.holdRemovePerm;
    const fromPerm = this.activePerm;

    this.switchPerm(inActivePerm, holdingPerm, fromPerm);
    this.holdRemovePerm = [];
  }

  onSubmit(formData): void {
    this.isLoading = true;
    const roleName = formData.value.roleName;
    console.log(roleName);
    for (const item of this.activePerm) {
      this.selectedPermissions.push(item.id);
    }
    this.rolesPayload.name = roleName;
    this.rolesPayload.permissions = this.selectedPermissions;
    console.log(this.selectedPermissions);
    this.createRoles();

  }

  //////////////////////// Helper functions ///////////////////////////////////////////////////////

  public getAllPermissions = () => {
    this.anonymousService.getPermissions().subscribe(
      response => {
        this.inActivePerm = this.transformText(response.data);
        this.inActivePerm.sort(this.sort.compareValues('name'));
        console.log('inactive perm');
        console.log(response.data);
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.getAllPermissions, err);
        console.log(msg);
      }
    );
  }

  public selectFromPerm(perm, arr): void {
    if (arr.length <= 0) {
      arr.push(perm);
      console.log(perm);
    } else {
      if (arr.indexOf(perm) === -1) {
        arr.push(perm);
      } else {
        arr.splice(arr.indexOf(perm), 1);
      }
    }
  }

  public transformText(t: any): any[] {
    const nT: any[] = [];
    for (const item of t) {
      const n: any = {name: '', id: ''};
      n.name = item.name.replace(/_/g, ' ');
      n.id = item.id;
      nT.push(n);
    }
    console.log(nT);
    return nT;
  }

  public switchPerm(addArr: any, remArr: object[], from: object[]): void {
    /////////// Add selected permissions to opposite list permission list /////////////////////////////////////////////
    remArr.forEach(item => {
      addArr.push(item);
    });

    /////////// Remove selected permission from Inactive list ///////////////////////////////////////////////////////
    for (const item of remArr) {
      from.splice( from.indexOf(item), 1);
    }

    this.sort.compareValues(addArr.name);

  }

  createRoles = () => {
    this.authServices.createRoles(this.rolesPayload).subscribe(
      data => {
        console.log('******** Roles **********');
        console.log(data);
        this.isLoading = false;
        this.getAllPermissions();
        this.activePerm = [];
        this.toast.showSuccess('Role created successfully', 'Success');
      },
      err => {
        console.log(err);
        const msg = this.error.errorHandlerWithText(this.createRoles, err);
        this.isLoading = false;
        console.log(msg);
        this.toast.showError(msg.message, 'Error');
      }
    );
  }

  // Sorting Function /////////////////////////////////////////////////
  // function for dynamic sorting
}
