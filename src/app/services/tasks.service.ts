import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../interfaces/itask';
import { ICRUDService } from '../interfaces/icrudservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements ICRUDService<ITask>{

  private url = 'http://localhost:50454/api/task';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(this.url);
  }

  post(task: ITask) {
    return this.httpClient.post<ITask>(this.url, task);
  }

  update(task: ITask) {
    return this.httpClient.put<ITask>(this.url, task);
  }

  delete(id: number) { throw new Error('Not implemented yet!'); }

  getById(id: number): ITask { throw new Error('Not implemented yet!'); }
}
