import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScheduleService } from '../data-access/schedule.service';
import { ScheduleSocketService } from '../data-access/schedule-socket.service';

@Component({
  standalone: true,
  selector: 'app-schedule-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-page.component.html',
})
export class SchedulePageComponent {
  private schedulesApi = inject(ScheduleService);
  private socket = inject(ScheduleSocketService);
  date=new Date().toLocaleDateString();
  schedules = signal<any[]>([]);
  newTitle = signal('');

  constructor() {
    this.load();

    this.socket.onSchedulesChanged(() => {
      this.load();
    });
  }

  load() {
    this.schedulesApi.getAll().subscribe(schedules => {
      this.schedules.set(schedules);
    });
  }

  add() {
    if (!this.newTitle()) return;

    this.schedulesApi.create(this.newTitle()).subscribe(() => {
      this.newTitle.set('');
    });
  }

  toggle(schedule: any) {
    this.schedulesApi
      .update(schedule.id, { completed: !schedule.completed })
      .subscribe();
  }

  remove(id: number) {
    this.schedulesApi.delete(id).subscribe();
  }
}