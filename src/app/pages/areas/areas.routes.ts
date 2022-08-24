import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasAddComponent } from './areas-add/areas-add.component';
import { AreasHomeComponent } from './areas-home/areas-home.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasUpdateComponent } from './areas-update/areas-update.component';

const routes: Routes = [{
  path: '',
  component: AreasHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: AreasListComponent,
    },
    {
      path: 'add',
      component: AreasAddComponent,
    },
    {
      path: 'edit/:id',
      component: AreasUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {
}
