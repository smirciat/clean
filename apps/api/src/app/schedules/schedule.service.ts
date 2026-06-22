import { Schedule } from './schedule.model';

export class ScheduleService {
  async getAll() {
    return Schedule.findAll();
  }

  async getById(id: number) {
    return Schedule.findByPk(id);
  }

  async create(data: any) {
    return Schedule.create({
      title: data.title,
    });
  }

  async update(id: number, data: any) {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) return null;

    await schedule.update(data);
    return schedule;
  }

  async remove(id: number) {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) return false;

    await schedule.destroy();
    return true;
  }
}