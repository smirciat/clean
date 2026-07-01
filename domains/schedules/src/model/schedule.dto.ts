export interface ScheduleDto {
  id: number;
  title: string;
  active?: boolean;
  date?: string | null;
  time?: string | null;
  interval?: string;
  category?: string | null;
  location?: string | null;
}
