import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../model/user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<UserDto[]>('/api/users');
  }

  create(title: string) {
    return this.http.post<UserDto>('/api/users', { title });
  }

  update(id: number, data: Partial<UserDto>) {
    return this.http.put<UserDto>(`/api/users/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`/api/users/${id}`);
  }
}
