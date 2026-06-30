import { Routes } from '@angular/router';
import { TaskPageComponent } from '@cleaners-workspace/tasks';
import { SchedulePageComponent } from '@cleaners-workspace/schedules';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskPageComponent,
    title:'Today`s Tasks',
    data:{nav:true,label:'Today`s Tasks'}
  },
  {
    path: 'schedules',
    component: SchedulePageComponent,
    title:'Daily Task List',
    data:{nav:true,label:'Daily Task List'}
  },
];
