import { Express } from 'express';
import { registerScheduleRoutes } from './schedule.controller';

export function registerSchedules(app: Express) {
  app.use('/api/schedules', registerScheduleRoutes());
}