import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { AreasAddComponent } from './areas-add/areas-add.component';
import { AreasHomeComponent } from './areas-home/areas-home.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasUpdateComponent } from './areas-update/areas-update.component';
import { AreasRoutingModule } from './areas.routes';



@NgModule({
  declarations: [AreasHomeComponent, AreasListComponent, AreasAddComponent, AreasUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NgbPaginationModule,
    ImageViewerModule,
    NgxPrintModule,
    ThemeModule,
    AreasRoutingModule,
  ],
})
export class AreasModule { }
