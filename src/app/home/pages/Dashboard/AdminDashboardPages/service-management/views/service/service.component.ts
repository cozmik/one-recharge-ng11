import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {ActivatedRoute} from '@angular/router';
import {ServiceManagerService} from '../service-manager.service';
import {ServiceInterface, ServiceModel} from '../../models/service.model';
import {MatDialog} from '@angular/material/dialog';
import {PackageViewModalComponent} from '../../components/modals/package-view-modal/package-view-modal.component';
import {ServiceStoreService} from '../../store/service-store.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {TemplatePortal} from '@angular/cdk/portal';
import {PanelService} from '../../panel.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {DomSanitizer} from '@angular/platform-browser';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ServiceConfigSheetComponent} from '../../components/modals/service-config-sheet/service-config-sheet.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['../../components/form-style.scss', './service.component.scss']
})
export class ServiceComponent implements OnInit {

  camera = faCamera;
  service: ServiceModel;
  serviceData: ServiceInterface;
  plusIcon = faPlus;
  close = faTimes;
  editConfiguration: boolean;
  private stillUpdating: boolean;
  loading: boolean;
  private testService: ServiceInterface;
  services: ServiceModel[] = [];
  filteredServices: ServiceModel[];
  private serviceId: number;

  constructor(private ar: ActivatedRoute,
              public servService: ServiceManagerService,
              private modal: MatDialog,
              public sanitizer: DomSanitizer,
              private serviceStore: ServiceStoreService,
              private sidenavService: PanelService,
              private vcf: ViewContainerRef,
              private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit(): void {
    this.serviceId = +this.ar.snapshot.paramMap.get('serviceId');
    const catId = +this.ar.snapshot.paramMap.get('id');
    this.getServiceDetails(catId, this.serviceId);
    this.servService.getAllServicesByCategories(() => {
      this.getAllServices();
    });
  }

  getServiceDetails(catId: number, serviceId: number): void {
    const placeHolderServiceFee = {
      feeAmount: 0,
      isFeePercentage: 0,
      isSuperAgentCommissionFixed: 0,
      isSystemCommissionFixed: 0,
      lowerBound: 0,
      superAgentCommission: 0,
      systemCommission: 0,
      upperBound: 0
    };

    this.serviceStore.categories.subscribe(res => {
      if (res.length) {
        this.service = new ServiceModel(this.serviceStore.getSelectedService(catId, serviceId));
        this.serviceData = JSON.parse(JSON.stringify(this.serviceStore.getSelectedService(catId, serviceId))) as ServiceInterface;
        this.testService = JSON.parse(JSON.stringify(this.serviceData)) as ServiceInterface;
        this.servService.title.next(this.testService.serviceName);
        if (this.serviceData.feeType === undefined) {
          this.serviceData.feeType = 0;
          this.testService.feeType = 0;
        }
        if (!this.serviceData.serviceFees || !this.serviceData.serviceFees.length) {
          this.serviceData.serviceFees = [placeHolderServiceFee];
          this.testService.serviceFees = [placeHolderServiceFee];
        }
      }
    });
  }

  openServiceConfig(): void {
    const bottomSheetRef = this.bottomSheet.open(ServiceConfigSheetComponent, {
      data: {service: this.serviceData, testService: this.testService},
      closeOnNavigation: true,
      disableClose: true
    });
  }

  getAllServices(): void {
    this.serviceStore.allServices.subscribe(res => {
      if (res.length) {
        res = res.filter(s => s.id !== this.serviceId);
        this.services = res.map(serv => new ServiceModel(serv));
        this.filteredServices = [...this.services];
      }
    });
  }

  filterServices(searchText): void {
    this.filteredServices = this.services.filter(res => res.serviceName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

  viewService(servicePackage): void {
    const dialogRef = this.modal.open(PackageViewModalComponent, {
      width: '400px',
      data: {servicePackage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  convertDataToBoolean(data): boolean {
    return data === 1;
  }

  updateService(): void {
    this.loading = true;
    this.servService.updateService(this.serviceData, () => {
      this.loading = false;
      this.stillUpdating = false;
    });
  }

  openServiceList(templateRef: TemplateRef<any>): void {
    const portal = new TemplatePortal(templateRef, this.vcf);
    this.sidenavService.open(portal);
  }

  closeSideNav(): void {
    this.sidenavService.close();
  }

  selectService(id: number): void {
    this.servService.pasteServiceConfig(id, this.service.id, () => {
      this.closeSideNav();
    });
  }
}
