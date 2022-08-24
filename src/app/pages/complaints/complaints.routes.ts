import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsAnswersComponent } from './complaints-answers/complaints-answers.component';
import { ComplaintsHomeComponent } from './complaints-home/complaints-home.component';
import { ComplaintsListComponent } from './complaints-list/complaints-list.component';

const routes: Routes = [{
  path: '',
  component: ComplaintsHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: ComplaintsListComponent,
    },
    {
      path: 'answers/:id',
      component: ComplaintsAnswersComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintsRoutingModule {
}
