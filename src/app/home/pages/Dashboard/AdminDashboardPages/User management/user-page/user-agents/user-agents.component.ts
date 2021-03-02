import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../../../core/services/users-service/user-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../../../../../core/services/anonymous-service';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {Agent} from '../../../../../../../core/mocks/user/agent.model';
import {ErrorService} from '../../../../../../../core/services/error_service/error.service';


@Component({
  selector: 'app-user-agents',
  templateUrl: './user-agents.component.html',
  styleUrls: ['./user-agents.component.scss']
})
export class UserAgentsComponent implements OnInit {
  public userId: number;
  public userAgents: Agent[];
  public agentWithId: any[];
  public isLoadingUserAgents = false;
  p = 0;

  constructor(public sharedService: SharedService, public router: Router, public anonymousService: AnonymousService,
              public agentService: UserService, public activatedRoute: ActivatedRoute, public error: ErrorService) {
    this.userAgents = [];
    this.agentWithId = [];
    this.activatedRoute.parent.params.subscribe(params => {
      this.userId = +params.id;
    });
  }

  ngOnInit(): void {
    this.getUserAgents();
  }

  // get all agents info
  getUserAgents(): void {
    this.isLoadingUserAgents = true;
    this.agentService.getUserAgents(this.userId).subscribe(
      data => {
        // console.log(data.data);
       const agentsList: any[] = data.data[0];
       agentsList.forEach((agent) => {
         if (agent.id !== this.userId) {
           this.userAgents.push(new Agent(agent));
         }
        });
       this.getAgentWithId();
       this.isLoadingUserAgents = false;

        // console.log(this.userAgents);
      },
      err => {
        // console.log(err);
        this.isLoadingUserAgents = false;
        this.error.errorHandlerWithText(this.getUserAgents, err);
      }
    );
  }

  // Sort data ////////////////////
  getAgentWithId(): void {

    for (let i = 0; i < this.userAgents.length; i++ ) {
      const sortedAgents: any = {id: 0, data: {}};
      sortedAgents.id = i + 1;
      sortedAgents.data = this.userAgents[i];
      this.agentWithId.push(sortedAgents);
    }
    // console.log('Agent with id');
    // console.log(this.agentWithId);
  }
}
