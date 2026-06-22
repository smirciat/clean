import express from 'express';
import cors from 'cors';
import http from 'http';
import { initializeSocket } from './app/realtime/socket';
import { sequelize } from './db';

import { registerSchedules } from './app/schedules';
import { registerTasks } from './app/tasks';
import { registerUsers } from './app/users';

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 feature modules
registerTasks(app);
registerUsers(app);
registerSchedules(app);


async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();
  
  const server = http.createServer(app);
  
  initializeSocket(server);

  server.listen(8080, () => {
    console.log('[ ready ] http://localhost:8080');
  });
}

bootstrap();