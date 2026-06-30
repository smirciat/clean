import { Component, inject, signal, effect, computed, untracked, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

import { TaskService } from '../data-access/task.service';
import { TaskSocketService } from '../data-access/task-socket.service';
import { TaskDto } from '@cleaners-workspace/tasks';

@Component({
  standalone: true,
  selector: 'app-task-page',
  imports: [CommonModule],//, FormsModule],
  templateUrl: './task-page.component.html',
})
export class TaskPageComponent {
  private tasksApi = inject(TaskService);
  private socket = inject(TaskSocketService);
  today = new Date();
  dateString = new Date(this.today.getTime() - (this.today.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
  date= signal(this.dateString);
  tasks = signal<TaskDto[]>([]);
  newTitle = signal('');

  constructor() {
    effect(()=>{
      let updatedDate = this.date();
      if (typeof updatedDate==='string') {
      }
      console.log(updatedDate)
      console.log(this.date());
      if (updatedDate) {
        untracked(()=>{this.load()})
      }
    });
    this.load();

    this.socket.onTasksChanged(() => {
      this.load();
    });
  }

  load() {
    let newDate=new Date(this.date()+"T00:00:00");
    this.tasksApi.getTodaysTasks(newDate.toLocaleDateString()).subscribe(tasks=> {
      this.tasks.set(tasks);
      tasks.sort((a,b)=>a.id-b.id);
    });
  }

  add() {
    if (!this.newTitle()) return;

    this.tasksApi.create(this.newTitle()).subscribe(() => {
      this.newTitle.set('');
    });
  }
  
  updateTask<K extends keyof TaskDto>(
    id: number,
    field: K,
    value: TaskDto[K]
  ) {
    this.tasks.update(list =>
      list.map(m =>
        m.id === id
          ? { ...m, [field]: value }
          : m
      )
    );
    this.update(this.tasks().find(t => t.id === id)!,field.toString());
  }
  
  update(task: TaskDto, field?:string) {
    console.log(task.completed)
    if (task.completed&&field==='completed') task.time=new Date().toLocaleTimeString();
    this.tasksApi.update(task.id,task).subscribe(() => {
      console.log('task updated');
    });
  }

  remove(id: number) {
    this.tasksApi.delete(id).subscribe();
  }
  
  openNativePicker() {
    const input = document.getElementById('dateInput') as HTMLInputElement;
    if (input && input.showPicker) {
      input.showPicker();
    }
  }
}