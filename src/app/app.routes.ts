import { Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { guardAuthGuard } from './guard/guard-auth.guard';
import { GestionUserComponent } from './gestion-user/gestion-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gestion-user',  // Rediriger par défaut vers gestion-user
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
    path: 'upload',
    loadComponent: () => import('./components/cv-uploader/cv-uploader.component')
      .then(m => m.CvUploaderComponent),
    canActivate: [guardAuthGuard],
    title: 'upload cv'
  },
  {
    path: 'update',
    loadComponent: () => import('./components/update-user/update-user.component')
      .then(m => m.ProfileComponent),
    canActivate: [guardAuthGuard],
    title: 'Update Profile'
  },
  {
    path: 'gestion-user',  // Route pour gestion-user
    component: GestionUserComponent,
  },
  {
    path: '**',  // Catch-all pour toute route non définie
    redirectTo: 'gestion-user'
  }
];
