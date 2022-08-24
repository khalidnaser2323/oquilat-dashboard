import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../@theme/theme.module';
import { UsersService } from '../../services/users/users.service';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersUpdateComponent } from './users-update/users-update.component';
import { UsersRoutingModule } from './users.routes';


@NgModule({
  declarations: [UsersHomeComponent, UsersListComponent, UsersAddComponent, UsersUpdateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NgbPaginationModule,
    ImageViewerModule,
    NgxPrintModule,
    ThemeModule,
  ],
  providers: [UsersService],
})
export class UsersModule { }
