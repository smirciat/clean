import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});
console.log('cwd:', process.cwd());
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD ? 'loaded' : 'missing');
import express from 'express';
import cors from 'cors';
import http from 'http';
import cron from 'node-cron';
import { initializeSocket } from './app/realtime/socket';
import { sequelize } from './db';

import { registerSchedules, daily } from './app/schedules';
import { registerTasks } from './app/tasks';
import { registerUsers } from './app/users';

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 feature modules
registerTasks(app);
registerUsers(app);
registerSchedules(app);

//cron job
cron.schedule('1 1 * * *', () => {
    console.log('Running daily task at:', new Date().toLocaleString());
    daily();
});


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