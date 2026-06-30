export interface ScheduleDto {
  id: number;
  title: string;
  active?: boolean;
  date?: string;
  time?: string;
  interval?: string;
  category?: string;
}
