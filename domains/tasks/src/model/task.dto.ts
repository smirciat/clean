export interface TaskDto {
  id: number;
  title: string;
  completed?: boolean;
  date?: string;
  time?: string;
  initials?: string;
  category?: string;
  comment?: string;
}
