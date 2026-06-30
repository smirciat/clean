import { Router } from 'express';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.model';
import { Task } from '../tasks/task.model';
import { io } from '../realtime';

const router = Router();
const service = new ScheduleService();

router.get('/', async (_req, res) => {
  res.json(await service.getAll());
});

router.get('/:id', async (req, res) => {
  const schedule = await service.getById(Number(req.params.id));
  if (!schedule) return res.status(404).json({ message: 'Not found' });
  res.json(schedule);
});

router.post('/', async (req, res) => {
  const schedule = await service.create(req.body);
  io?.emit('schedulesChanged');
  res.status(201).json(schedule);
});

router.put('/:id', async (req, res) => {
  const updated = await service.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  io?.emit('schedulesChanged');
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const ok = await service.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Not found' });
  io?.emit('schedulesChanged');
  res.status(204).send();
});

export async function daily(){
  const allSchedules=await Schedule.findAll({
    where:{active:true,interval:'Daily'},
    raw:true
  });
  for (const schedule of allSchedules){
    let task={title:schedule.title,date:new Date().toLocaleString()};
    await Task.create(task);
  }
}

export function registerScheduleRoutes() {
  return router;
}