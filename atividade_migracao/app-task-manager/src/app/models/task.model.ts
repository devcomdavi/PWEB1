export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskLevel = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  due: string;
  level: TaskLevel;
  desc: string;
  status: TaskStatus;
}