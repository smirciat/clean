import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../model/task.dto';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<TaskDto[]>('/api/tasks');
  }
  
  getTodaysTasks(date:string) {
    return this.http.post<TaskDto[]>('/api/tasks/todaysTasks',{date});
  }

  create(title: string) {
    return this.http.post<TaskDto>('/api/tasks', { title });
  }

  update(id: number, data: Partial<TaskDto>) {
    return this.http.put<TaskDto>(`/api/tasks/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`/api/tasks/${id}`);
  }
}
