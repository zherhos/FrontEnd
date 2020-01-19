import { ITask } from '../interfaces/itask';

export class Task implements ITask {
  id: number;
  description: string;
  status: string;
}
