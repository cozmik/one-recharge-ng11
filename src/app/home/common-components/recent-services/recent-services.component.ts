import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceInterface, ServiceModel} from '../../pages/Dashboard/AdminDashboardPages/service-management/models/service.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../core/services/shared-service/shared.service';
import {Constants} from '../../../shared/Constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AnonymousService} from '../../../core/services/anonymous-service';
import {ServiceStoreService} from '../../pages/Dashboard/AdminDashboardPages/service-management/store/service-store.service';

@Component({
  selector: 'app-recent-services',
  templateUrl: './recent-services.component.html',
  styleUrls: ['../../pages/Dashboard/user-shared/select-package/select-package.component.scss', './recent-services.component.scss']
})
export class RecentServicesComponent implements OnInit {
  @Output() selectService = new EventEmitter();
  @Input() title: boolean;
  recentServices: ServiceModel[];
  private user: any;
  serviceList: ServiceInterface[];

  constructor(
    public sanitizer: DomSanitizer,
    public sharedService: SharedService,
    private router: Router,
    private spServ: ServiceStoreService,
    private ar: ActivatedRoute,
    private anonymousService: AnonymousService
  ) {
    this.spServ.allServices.subscribe(r => {
      if (r.length) {
        this.serviceList = r;
        this.populateRecentServices();
      }
    });
  }

  ngOnInit(): void {
  }

  populateRecentServices(): void {
    const rServices = [];
    let link = '';
    this.user = JSON.parse(localStorage.getItem(Constants.PROFILE));
    if (this.user) {
      link = 'userFreqServices';
    } else {
      link = 'guestFreqServices';
    }
    AnonymousService[link].subscribe(s => {
      if (s.size) {
        const m = new Map([...s.entries()].sort((a, b) => b[1] - a[1]).slice(0, 9));
        m.forEach((value, key) => {
          rServices.push(new ServiceModel(key));
          });
        this.recentServices = rServices;
      }
    });
  }

  getService(service: ServiceModel): void {
    if (this.user) {
      this.router.navigate([this.user.userType.toLowerCase() === 'agent'
        ? 'sell/' + service.serviceCategory.id + '/' + service.id
        : 'services/' + service.serviceCategory.id + '/' + service.id], {relativeTo: this.ar.parent}).then(() => {
      });
    } else {
      this.selectService.emit({data: service});
    }
  }
}
