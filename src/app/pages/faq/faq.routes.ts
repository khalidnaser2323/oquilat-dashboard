import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqAddComponent } from './faq-add/faq-add.component';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqUpdateComponent } from './faq-update/faq-update.component';
const routes: Routes = [{
  path: '',
  component: FaqHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: FaqListComponent,
    },
    {
      path: 'add',
      component: FaqAddComponent,
    },
    {
      path: 'edit/:id',
      component: FaqUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class faqRoutingModule {
}
