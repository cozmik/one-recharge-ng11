import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ServiceCategoriesComponent} from './views/service-categories/service-categories.component';
import {CategoryComponent} from './views/category/category.component';
import {ServiceComponent} from './views/service/service.component';
import {ServiceManagementComponent} from './service-management.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'categories'
  },
  {
    path: '',
    component: ServiceManagementComponent,
    children: [
      {
        path: 'categories',
        pathMatch: 'full',
        component: ServiceCategoriesComponent
      },
      {
        path: 'categories/:id',
        component: CategoryComponent,
      },
      {
        path: 'categories/:id/service/:serviceId',
        component: ServiceComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServiceRoutingModule {
}
