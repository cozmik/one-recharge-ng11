import { Component, OnInit } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {ServiceManagerService} from '../../views/service-manager.service';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  title = '';
  userIcon = faUser;
  signOut = faSignOutAlt;
  constructor( private smService: ServiceManagerService, public sharedService: SharedService) {
    this.smService.title.subscribe(res => {
      this.title = res;
    });
  }

  ngOnInit(): void {
  }

}
