import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {Constants} from "../../../../../shared/Constants";

@Component({
  selector: 'app-agent-support',
  templateUrl: './agent-support.component.html',
  styleUrls: ['./agent-support.component.scss']
})
export class AgentSupportComponent implements OnInit {

  pageTitle: string;
  supportEmail = Constants.SUPPORT_EMAIL;
  constructor(public sharedService: SharedService) {
    this.pageTitle = 'Support';
    this.sharedService.emitChange(this.pageTitle);
  }

  ngOnInit(): void {
  }

}
