import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundlesAddComponent } from './bundles-add/bundles-add.component';
import { BundlesHomeComponent } from './bundles-home/bundles-home.component';
import { BundlesListComponent } from './bundles-list/bundles-list.component';
import { BundlesUpdateComponent } from './bundles-update/bundles-update.component';

const routes: Routes = [{
  path: '',
  component: BundlesHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: BundlesListComponent,
    },
    {
      path: 'add',
      component: BundlesAddComponent,
    },
    {
      path: 'edit/:id',
      component: BundlesUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundlessRoutingModule {
}
