import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { FaqService } from '../../services/faq/faq.service';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { faqRoutingModule } from './faq.routes';
import { FaqAddComponent } from './faq-add/faq-add.component';
import { FaqUpdateComponent } from './faq-update/faq-update.component';



@NgModule({
  declarations: [FaqListComponent, FaqHomeComponent, FaqAddComponent, FaqUpdateComponent],
  imports: [
    CommonModule,
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPrintModule,
    ImageViewerModule,
    faqRoutingModule,
  ],
  providers: [FaqService],
})
export class FaqModule { }
