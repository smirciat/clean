import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class TaskSocketService {
  socket = io('https://smircich.ddns.net:58791', {
    path: '/api/socket.io',
  });

  onTasksChanged(cb: () => void) {
    this.socket.on('tasksChanged', cb);
  }
}
