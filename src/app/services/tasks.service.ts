import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../interfaces/itask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private url = 'http://localhost:50454/api/task';

  constructor(private httpClient: HttpClient) { }

  getAllTasks() {
    return this.httpClient.get<ITask[]>(this.url);
  }

  postTask(task: ITask) {
    return this.httpClient.post<ITask>(this.url, task);
  }

}
