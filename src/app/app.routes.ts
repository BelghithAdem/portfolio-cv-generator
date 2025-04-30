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
        component: ResumeBuilderComponent,
    }
];
