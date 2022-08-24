import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CanActivateAdminGuard } from './services/auth-guard/adminAuth.guard';
import { CanActivateAnonymous } from './services/auth-guard/anonymous.guard';
import { CanActivateViaAuthGuard } from './services/auth-guard/auth.guard';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [CanActivateViaAuthGuard, CanActivateAdminGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [CanActivateAnonymous],
  },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
