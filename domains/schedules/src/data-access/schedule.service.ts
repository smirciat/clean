import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduleDto } from '../model/schedule.dto';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<ScheduleDto[]>('/api/schedules');
  }

  create(title: string) {
    return this.http.post<ScheduleDto>('/api/schedules', { title });
  }

  update(id: number, data: Partial<ScheduleDto>) {
    return this.http.put<ScheduleDto>(`/api/schedules/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`/api/schedules/${id}`);
  }
}
