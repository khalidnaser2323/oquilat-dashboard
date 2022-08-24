import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsHomeComponent } from './questions-home/questions-home.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

const routes: Routes = [{
  path: '',
  component: QuestionsHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: QuestionsListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class questionsRoutingModule {
}
