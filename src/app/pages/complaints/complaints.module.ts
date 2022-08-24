import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { ComplaintsService } from '../../services/complaints/complaints.service';
import { ComplaintsAnswersComponent } from './complaints-answers/complaints-answers.component';
import { ComplaintsHomeComponent } from './complaints-home/complaints-home.component';
import { ComplaintsListComponent } from './complaints-list/complaints-list.component';
import { ComplaintsRoutingModule } from './complaints.routes';


@NgModule({
  declarations: [ComplaintsHomeComponent, ComplaintsListComponent, ComplaintsAnswersComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPrintModule,
    ImageViewerModule,
    ComplaintsRoutingModule,
  ],
  providers: [ComplaintsService],
})
export class ComplaintsModule { }
