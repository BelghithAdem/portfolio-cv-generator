/*import { Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/resume-builder',
        pathMatch: 'full'
    },
    {
        path: 'resume-builder',
        component: ResumeBuilderComponent,
    }
];
*/
import { Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/resume-builder',
    pathMatch: 'full'
  },
  {
    path: 'resume-builder',
    component: ResumeBuilderComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
  }
];

