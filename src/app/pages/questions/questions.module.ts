import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { ComplaintsService } from '../../services/complaints/complaints.service';
import { questionsRoutingModule } from "./questions.routes";
import { QuestionsHomeComponent } from './questions-home/questions-home.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

@NgModule({
  declarations: [QuestionsHomeComponent, QuestionsListComponent],
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
    questionsRoutingModule,
  ],
  providers: [ComplaintsService],
})
export class QuestionsModule { }
