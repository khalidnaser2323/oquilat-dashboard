import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSocketService } from 'app/services/conversations/web-socket.service';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { ConversationsService } from '../../services/conversations/conversations.service';
import { ConversationsHomeComponent } from './conversations-home/conversations-home.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { ConversationsViewComponent } from './conversations-view/conversations-view.component';
import { ConversationsRoutingModule } from './conversations.routes';


@NgModule({
  declarations: [ConversationsHomeComponent, ConversationsListComponent, ConversationsViewComponent],
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
    ConversationsRoutingModule,
  ],
  providers: [ConversationsService, WebSocketService],
})
export class ConversationsModule { }
