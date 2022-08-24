import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAdminGuard } from '../services/auth-guard/adminAuth.guard';
import { CanActivateViaAuthGuard } from '../services/auth-guard/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'orders',
      pathMatch: 'full',
    },
    {
      path: 'orders',
      loadChildren: () => import('./orders/orders.module')
        .then(m => m.OrdersModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'complaints',
      loadChildren: () => import('./complaints/complaints.module')
        .then(m => m.ComplaintsModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'bundles',
      loadChildren: () => import('./bundles/bundles.module')
        .then(m => m.BundlesModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'team',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'areas',
      loadChildren: () => import('./areas/areas.module')
        .then(m => m.AreasModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'questions',
      loadChildren: () => import('./questions/questions.module')
        .then(m => m.QuestionsModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'faq',
      loadChildren: () => import('./faq/faq.module')
        .then(m => m.FaqModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
    {
      path: 'conversations',
      loadChildren: () => import('./conversations/conversations.module')
        .then(m => m.ConversationsModule),
      canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
