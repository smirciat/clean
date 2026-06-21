import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../data-access/task.service';
import { TaskSocketService } from '../data-access/task-socket.service';

@Component({
  standalone: true,
  selector: 'app-task-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-page.component.html',
})
export class TaskPageComponent {
  private tasksApi = inject(TaskService);
  private socket = inject(TaskSocketService);
  date=new Date().toLocaleDateString();
  tasks = signal<any[]>([]);
  newTitle = signal('');

  constructor() {
    this.load();

    this.socket.onTasksChanged(() => {
      this.load();
    });
  }

  load() {
    this.tasksApi.getAll().subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  add() {
    if (!this.newTitle()) return;

    this.tasksApi.create(this.newTitle()).subscribe(() => {
      this.newTitle.set('');
    });
  }

  toggle(task: any) {
    this.tasksApi
      .update(task.id, { completed: !task.completed })
      .subscribe();
  }

  remove(id: number) {
    this.tasksApi.delete(id).subscribe();
  }
}