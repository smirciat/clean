import { Routes } from '@angular/router';
import { TaskPageComponent } from '@cleaners-workspace/tasks';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskPageComponent,
  },
];
