import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class TaskSocketService {
  socket = io(window.location.origin, {
    path: '/api/socket.io',
  });

  onTasksChanged(cb: () => void) {
    this.socket.on('tasksChanged', cb);
  }
}
