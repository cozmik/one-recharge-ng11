import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ServiceModel} from '../../../service-management/models/service.model';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../../../../../core/services/shared-service/shared.service';
import {Constants} from '../../../../../../../shared/Constants';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.scss']
})
export class ViewServicesComponent implements OnInit {
  @Input() auth: boolean;
  recentServices: ServiceModel[];
  private user: any;

  constructor(
    public sanitizer: DomSanitizer,
    public sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(Constants.PROFILE));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      if (changes && changes.auth.currentValue) {
        this.recentServices = JSON.parse(localStorage.getItem(Constants.USER_RECENT_SERVICES));
      }
    }
  }
}
