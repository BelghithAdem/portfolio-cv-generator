import { Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { guardAuthGuard } from './guard/guard-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resume-builder',
    pathMatch: 'full'
  },
  {
    path: 'resume-builder',
    component: ResumeBuilderComponent,
    title: 'Resume Builder'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component')
      .then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: 'user',
    loadComponent: () => import('./components/user/user.component')
      .then(m => m.HomeComponent),
    canActivate: [guardAuthGuard],
    title: 'User Profile'
  },
  {
    path: 'update',
    loadComponent: () => import('./components/update-user/update-user.component')
      .then(m => m.ProfileComponent),
    canActivate: [guardAuthGuard],
    title: 'Update Profile'
  },
  {
    path: '**',
    redirectTo: 'resume-builder'
  }
];
