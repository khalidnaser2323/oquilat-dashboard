import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersPrintComponent } from './orders-print/orders-print.component';
import { OrdersReportsComponent } from './orders-reports/orders-reports.component';
import { OrdersSearchComponent } from './orders-search/orders-search.component';

const routes: Routes = [{
  path: '',
  component: OrdersHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: OrdersListComponent,
    },
    {
      path: 'view/:id',
      component: OrderViewComponent,
    },
    {
      path: 'search',
      component: OrdersSearchComponent,
    },
    {
      path: 'reports',
      component: OrdersReportsComponent,
    },
    {
      path: 'print',
      component: OrdersPrintComponent,
    },
    {
      path: 'add',
      component: OrderAddComponent,
    },
    {
      path: 'edit/:id',
      component: OrderUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
}
