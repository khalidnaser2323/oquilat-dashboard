import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsHomeComponent } from './conversations-home/conversations-home.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { ConversationsViewComponent } from './conversations-view/conversations-view.component';

const routes: Routes = [{
  path: '',
  component: ConversationsHomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: ConversationsListComponent,
    },
    {
      path: 'view/:id',
      component: ConversationsViewComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationsRoutingModule {
}
