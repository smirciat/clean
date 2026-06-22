import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class ScheduleSocketService {
  socket = io(window.location.origin, {
    path: '/api/socket.io',
  });

  onSchedulesChanged(cb: () => void) {
    this.socket.on('schedulesChanged', cb);
  }
}
