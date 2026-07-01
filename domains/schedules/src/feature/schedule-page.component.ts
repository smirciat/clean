import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleService } from '../data-access/schedule.service';
import { ScheduleSocketService } from '../data-access/schedule-socket.service';
import { ScheduleDto } from '@cleaners-workspace/schedules';

@Component({
  standalone: true,
  selector: 'app-schedule-page',
  imports: [CommonModule],
  templateUrl: './schedule-page.component.html',
})
export class SchedulePageComponent {
  private schedulesApi = inject(ScheduleService);
  private socket = inject(ScheduleSocketService);
  readonly intervals = [
    '',
    'Hourly',
    'Daily',
    'Weekly'
  ] as const;
  date=new Date().toLocaleDateString();
  schedules = signal<any[]>([]);
  newTitle = signal('');
  
  constructor() {
    effect(()=>{
      let updatedSchedules=this.schedules();
      console.log(updatedSchedules);
    });
  }

  ngOnInit() {
    this.load();
    

    this.socket.onSchedulesChanged(() => {
      this.load();
    });
    
    
  }

  load() {
    this.schedulesApi.getAll().subscribe(schedules => {
      const sortedSchedules=schedules.sort((a,b)=>a.id-b.id);
      this.schedules.set(sortedSchedules);
    });
  }

  add() {
    if (!this.newTitle()) return;
    
    this.schedulesApi.create(this.newTitle(),"Daily").subscribe(() => {
      this.newTitle.set('');
    });
  }
  
  updateSchedule<K extends keyof ScheduleDto>(
    id: number,
    field: K,
    value: ScheduleDto[K]
  ) {
    this.schedules.update(list =>
      list.map(m =>
        m.id === id
          ? { ...m, [field]: value }
          : m
      )
    );
    this.update(this.schedules().find(t => t.id === id)!,field.toString());
  }
  
  update(schedule: ScheduleDto, field?:string) {
    this.schedulesApi.update(schedule.id,schedule).subscribe(() => {
      console.log('schedule updated');
    });
  }

  remove(id: number) {
    this.schedulesApi.delete(id).subscribe();
  }
}