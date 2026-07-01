import { Task } from './task.model';

export class TaskService {
  async getAll() {
    return Task.findAll();
  }
  
  async getTodaysTasks(dateString:string) {
    return Task.findAll({
      where:{date:dateString}
    });
  }

  async getById(id: number) {
    return Task.findByPk(id);
  }

  async create(data: any) {
    return Task.create(data);
  }

  async update(id: number, data: any) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.update(data);
    return task;
  }

  async remove(id: number) {
    const task = await Task.findByPk(id);
    if (!task) return false;

    await task.destroy();
    return true;
  }
}