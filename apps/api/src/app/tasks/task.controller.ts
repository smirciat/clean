import { Router } from 'express';
import { TaskService } from './task.service';
import { io } from '../realtime';

const router = Router();
const service = new TaskService();

router.get('/', async (_req, res) => {
  res.json(await service.getAll());
});

router.post('/todaysTasks', async (_req, res) => {
  if (!_req.body.date) res.status(500).json('need to include dateString');
  res.json(await service.getTodaysTasks(_req.body.date));
});

router.get('/:id', async (req, res) => {
  const task = await service.getById(Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});

router.post('/', async (req, res) => {
  const task = await service.create(req.body);
  io?.emit('tasksChanged');
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const updated = await service.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  io?.emit('tasksChanged');
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const ok = await service.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Not found' });
  io?.emit('tasksChanged');
  res.status(204).send();
});

export function registerTaskRoutes() {
  return router;
}