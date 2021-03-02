import {Component, OnInit} from '@angular/core';
import {ServiceModel} from '../../AdminDashboardPages/service-management/models/service.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';

@Component({
  selector: 'app-recent-services',
  templateUrl: './recent-services.component.html',
  styleUrls: ['../select-package/select-package.component.scss', './recent-services.component.scss',]
})
export class RecentServicesComponent implements OnInit {
  recentServices: ServiceModel[];

  constructor(
    public sanitizer: DomSanitizer,
    public sharedService: SharedService,
    ) {
  }

  ngOnInit(): void {
  }
}
