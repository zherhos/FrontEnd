import { Observable } from 'rxjs';

export interface ICRUDService<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  post(task: T);
  update(task: T);
  delete(id: number);
}
