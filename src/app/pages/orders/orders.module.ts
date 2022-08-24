import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { BundlesService } from '../../services/bundles/bundles.service';
import { OrdersService } from '../../services/orders/orders.service';
import { PaymentsService } from '../../services/payments/payments.service';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrdersHomeComponent } from './orders-home/orders-home.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersPrintComponent } from './orders-print/orders-print.component';
import { OrdersReportsComponent } from './orders-reports/orders-reports.component';
import { OrdersSearchComponent } from './orders-search/orders-search.component';
import { OrdersRoutingModule } from './orders.routes';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderViewComponent,
    OrdersReportsComponent,
    OrdersSearchComponent,
    OrdersPrintComponent,
    OrdersHomeComponent,
    OrderAddComponent,
    OrderUpdateComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NbCardModule,
    ThemeModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPrintModule,
    ImageViewerModule,
    TranslateModule,
  ],
  providers: [OrdersService, BundlesService, PaymentsService],
})
export class OrdersModule { }
