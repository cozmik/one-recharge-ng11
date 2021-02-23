import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SharedService} from '../../../../../../core/services/shared-service/shared.service';
import {AnonymousService} from '../../../../../../core/services/anonymous-service';
import {AuthService} from '../../../../../../core/authentication/auth-service.service';
import {UserService} from '../../../../../../core/services/users-service/user-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ErrorService} from '../../../../../../core/services/error_service/error.service';
import {ToastService} from '../../../../../../shared/services/toast-service/toast.service';
import {Constants} from '../../../../../../shared/Constants';
import '../../../../../../shared/components/custom-alert/custom-alert.component';
import {User} from '../../../../../../core/mocks/user/user.model';
import {Agent} from '../../../../../../core/mocks/user/agent.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  pageTitle = 'Create User';
  public userForm: FormGroup;
  public uUser: boolean;
  public cUser: boolean;
  public switchCreate: boolean;
  public isloading: boolean;
  public createText = 'Create User';
  public uplodText: String;
  public createAgentType: String;
  public allSuccessfulMsg: string;
  public partiallySuccessfulMsg: string;
  public unsucceessfulMsg: string;
  public superAgents: any[];
  public roles: any;
  private superAgentsAgentList: Agent[];

  // variables for excel upload
  public successfulAgents: any;
  public unsuccessfulAgents: any;
  public failedRows: any;

  public onlineFlag = navigator.onLine;
  @ViewChild('excel') inputEl: ElementRef;
  // @ViewChild('agentProfilePicture') agentEl: ElementRef;

  @ViewChild(FormGroupDirective) myForm;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{7,14}$';

  public roleId: any;
  public successText: string;
  public errorText: String;
  private allAgents: any;
  public numberExists: any;
  public emailExists: any;
  public userEmail: any;
  public loggedInUser: any;

  constructor(public sharedService: SharedService, public anonymousService: AnonymousService,
              public authService: AuthService, public agentService: UserService,
              public router: Router, public fb: FormBuilder, public errorHandler: ErrorService,
              public toast: ToastService) {
    this.sharedService.emitChange(this.pageTitle);
    this.switchCreate = true;
    this.cUser = true;
    this.uplodText = 'Upload Agents';
    this.isloading = false;
    this.createForm();


    this.loggedInUser = new User(JSON.parse(localStorage.getItem(Constants.PROFILE)));
    this.userEmail = this.loggedInUser.email;

    // console.log('**', this.loggedInUser.getUserType());

    if (this.loggedInUser.getUserType() === Constants.ADMIN_USERTYPE) {
      this.createAgentType = 'super';
    }
    else if (this.loggedInUser.getUserType() === Constants.SUPER_AGENT_USERTYPE) {
      this.createAgentType = 'subSuper';
    }else if (this.loggedInUser.getUserType() === Constants.SUB_SUPER_AGENT_USERTYPE) {
      this.createAgentType = 'agent';
    }

    // console.log(this.createAgentType);

  }

  ngOnInit(): void {
    this.getAllAgents();
    this.getRoles();
  }

  getAgentType = (type) => {
    let agentName = '';
    switch (type) {
      case 'super':
        agentName = 'Super Agent';
        break;
      case 'subSuper':
        agentName = 'Sub Super Agent';
        break;
      case 'agent':
        agentName = 'Agent';
        break;
    }
    return agentName;
  }

  // Get roles
  getRoles = () => {
    this.anonymousService.getRoles().subscribe(
      data => {
        // console.log(data);
        if (this.loggedInUser.userType === 'AGENT') {
          this.userForm.controls.roleId.clearValidators();
          this.userForm.controls.roleId.updateValueAndValidity();
        }
        this.roles = data.data;
      },
      err => {
        // console.log(err);
        const msg = this.errorHandler.errorHandlerWithText(this.getRoles, err);
        // console.log(msg.message);
      }
    );
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      altMobileNo: ['', [Validators.pattern(this.mobnumPattern)]],
      address: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      superAgentId: [''],
      subOrSuperAgent: [''],
      createAgentType: [''], // check user to create
      isSuperAgent: [''],
      isSubSuperAgent: ['']
    });
  }

  // check if phone number exists
  checkNum = () => {
    this.sharedService.checkUserExist('', this.userForm.value.mobileNo).subscribe(
      data => {
        this.numberExists = data;
        if (this.numberExists) {
          this.userForm.controls.mobileNo.setErrors({numberExists: true});
        }
      }, err => {
        this.errorHandler.errorHandlerWithText(this.checkNum, err);
       // console.log(error.message);
        this.numberExists = null;
      });
  }

  // check if email address exists
  checkEmail = () => {
  this.sharedService.checkUserExist(this.userForm.value.email, '').subscribe(
    data => {
      this.emailExists = data;

      if (this.emailExists) {
        this.userForm.controls.email.setErrors({emailExists: true});
      }

    }, err => {
      this.errorHandler.errorHandlerWithText(this.checkEmail, err);
      this.emailExists = null;
    });
}

  resetForm(): void {
    this.myForm.resetForm();
  }

  // Swap between uploading user and creating users
  getVal(): void {
    if ( this.cUser === true ) {
      this.cUser = false;
      this.uUser = true;
    } else {
      this.cUser = true;
      this.uUser = false;
    }
  }


  updateAssignedAgents(): void {
    if (this.loggedInUser.userType === 'AGENT') {
      if (this.createAgentType === 'agent' && !this.loggedInUser.isSubSuperAgent) {
        this.userForm.controls.superAgentId.enable();
        console.log(this.superAgentsAgentList);
        this.superAgents = this.superAgentsAgentList.filter(agent => agent.isSubSuperAgent === 1);
        this.superAgents.push(this.loggedInUser);
      } else {
        this.superAgents = [];
        this.superAgents.push(this.loggedInUser);
        this.userForm.controls.superAgentId.setValue(this.loggedInUser.id);
        this.userForm.controls.superAgentId.disable();
      }
    } else {
      if (this.createAgentType === 'subSuper') {
        this.superAgents = this.superAgentsAgentList.filter(agent => agent.isSuperAgent === 1);
      } else {
        this.superAgents = this.superAgentsAgentList;
      }
    }

    // sort the list
    this.superAgents.sort((a, b) => a.lastName < b.lastName ? -1 : (a.lastName > b.lastName ? 1 : 0));
  }

  // get all agents info
  getAllAgents = () => {
    this.superAgents = [];
    this.superAgentsAgentList = [];
    this.agentService.getAgents(undefined, undefined).subscribe(
      data => {
        this.superAgentsAgentList = [];
        this.allAgents = data;
        if (this.loggedInUser.userType  !==  'AGENT') {
          this.superAgents = [];
          for (const agent of data.data[0].content) {
            this.superAgentsAgentList.push(new Agent(agent));
          }
          console.log(this.superAgentsAgentList);
        } else {
          this.superAgentsAgentList = [];
          for (let agent of data.data[0].content) {
            agent = new Agent(agent);
            this.superAgentsAgentList.push(agent);
          }
          this.superAgents.push(JSON.parse(localStorage.getItem(Constants.PROFILE)));
          this.userForm.controls.superAgentId.setValue(this.loggedInUser.id);
          this.userForm.controls.superAgentId.disable();
        }
      },
      err => {
        // console.log(err);
        const msg = this.errorHandler.errorHandlerWithText(this.getAllAgents, err);
        // console.log(msg.message);
      }
    );
  }

  onSubmit(): void {
    this.userForm.disable();
    this.createUser();
  }

  onSubmitFIle() {
    this.isloading = true;
    this.uplodText = 'Creating Agents...';
    this.createMultipleUser();
  }


  createUser = () => {
   this.isloading = true;
   this.createText = 'Creating user...';

   if (this.userForm.value.createAgentType === 'super') {
      this.userForm.patchValue({
        isSuperAgent: 1,
        isSubSuperAgent: 0
      });
    } else if (this.userForm.value.createAgentType === 'subSuper') {
      this.userForm.patchValue({
        isSubSuperAgent: 1,
        roleId: this.loggedInUser.userType === Constants.AGENT_USERTYPE ? 0 : this.userForm.value.roleId,
        isSuperAgent: 0
      });

    } else if (this.userForm.value.createAgentType === 'agent') {
      // this.loggedInUser this.superAgentId = this.userForm.value.subOrSuperAgent;
      this.userForm.patchValue({
        isSubSuperAgent: 0,
        isSuperAgent: 0,
        // superAgentId : 't,
        roleId: this.loggedInUser.userType === Constants.AGENT_USERTYPE ? 2 : this.userForm.value.roleId,
      });
    }

   if (this.userForm.value) {
      this.userForm.removeControl('subOrSuperAgent');
      this.userForm.removeControl('createAgentType');

      console.log(this.userForm.value);
      this.createAgent();
    }
  }


// create agent
  createAgent = () => {
    // const inputEl: HTMLInputElement = this.agentEl.nativeElement;
    const formData = new FormData();

    this.authService.createAgent(this.userForm.value, formData).subscribe(
        data => {
          console.log(data);
          this.isloading = false;
          this.resetForm();
          this.userForm.enable();
          this.createText = 'Create user';
          this.successText = 'Agent created successfully';
          this.toast.showSuccess('Agent created successfully', 'Success');
          // this.router.navigate(['/admin/manage-user'])
        },
        err => {
          console.log(err);
          const errorText = this.errorHandler.errorHandlerWithText(this.createAgent, err);
          this.isloading = false;
          this.createText = 'Create user';
          console.log(errorText);
          this.toast.showError(errorText.message, 'Error');
          this.userForm.enable();
        }
      );
    // }
  }


  // upload user excel file
  createMultipleUser = () => {

    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      console.log('started');

      formData.append('agentSheetFile', inputEl.files.item(0));
      this.roleId = 1;
      this.authService.createMultipleUser( this.roleId, formData).subscribe(
        response => {
          console.log('success');
          const result = response.data[0];
          this.successfulAgents = result.successful;
          this.unsuccessfulAgents = result.unsuccessful;

          this.allSuccessfulMsg = this.successfulAgents + 'Agent(s) were created successfully ';

          this.partiallySuccessfulMsg = `
             ${this.successfulAgents} of ${this.successfulAgents + this.unsuccessfulAgents}
             Agent(s) was created successfully. An email containing the report has been sent to ${this.userEmail}
            `;

          this.unsucceessfulMsg = `No Agent was created. An email containing the report has been sent to ${this.userEmail}`;

          this.isloading = false;
          this.uplodText = 'Create Agent';
        },
        error => {
          console.log('failed');
          console.log(error);
          const msg = this.errorHandler.errorHandlerWithText(this.createMultipleUser, error);
          console.log(msg);
        }
      );
    } else {
      console.log('Empty file upload');
    }
  }
}
