import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersUpdateComponent } from './users-update/users-update.component';

const routes: Routes = [{
  path: '',
  component: UsersHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: UsersListComponent,
    },
    {
      path: 'add',
      component: UsersAddComponent,
    },
    {
      path: 'edit/:id',
      component: UsersUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
