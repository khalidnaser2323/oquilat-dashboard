import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { BundlesService } from '../../services/bundles/bundles.service';
import { BundlesAddComponent } from './bundles-add/bundles-add.component';
import { BundlesHomeComponent } from './bundles-home/bundles-home.component';
import { BundlesListComponent } from './bundles-list/bundles-list.component';
import { BundlesUpdateComponent } from './bundles-update/bundles-update.component';
import { BundlessRoutingModule } from './bundles.routes';


@NgModule({
  declarations: [BundlesHomeComponent, BundlesListComponent, BundlesAddComponent, BundlesUpdateComponent],
  imports: [
    CommonModule,
    BundlessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NgbPaginationModule,
    ImageViewerModule,
    NgxPrintModule,
    ThemeModule,
  ],
  providers: [BundlesService],
})
export class BundlesModule { }
