import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ServiceModel} from '../../pages/Dashboard/AdminDashboardPages/service-management/models/service.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {Constants} from '../../../shared/Constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recent-services',
  templateUrl: './recent-services.component.html',
  styleUrls: ['../../pages/Dashboard/user-shared/select-package/select-package.component.scss', './recent-services.component.scss',]
})
export class RecentServicesComponent implements OnInit, OnChanges {
  @Input() auth: boolean;
  @Input() size: any;
  @Input() services: ServiceModel[];
  @Input() provided: boolean;
  @Input() title: boolean;
  recentServices: ServiceModel[];
  private user: any;

  constructor(
    public sanitizer: DomSanitizer,
    public sharedService: SharedService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(Constants.PROFILE));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.provided.currentValue){
      this.recentServices = this.services;
    } else {
      if (this.user) {
        if (changes && changes.auth.currentValue) {
          this.recentServices = JSON.parse(localStorage.getItem(Constants.USER_RECENT_SERVICES));
        }
      }
    }
  }

  getService(id: number): void {
    if (!this.provided) {
      this.router.navigate(['services/' + id]);
    }
  }
}
