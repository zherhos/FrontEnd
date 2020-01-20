import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Task } from '../classes/task';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TasksService', () => {
  let tasksService: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TasksService
      ]
    });

    tasksService = TestBed.get(TasksService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return expected tasks', () => {
      const expectedTasks: Task[] =  [{ id: 1, description: 'A', status: 'Pending' }, { id: 2, description: 'B', status: 'Completed' }];

      tasksService.getAll().subscribe(tasks => {
        expect(tasks.length).toBe(expectedTasks.length);
        expect(tasks).toEqual(expectedTasks);
      });

      const request = httpMock.expectOne(`${tasksService.url}`);
      expect(request.request.method).toBe('GET');

      request.flush(expectedTasks);
  });

  it('should post a new task', () => {
      const newTask: Task =  { id: 1, description: 'A', status: 'Pending' };

      tasksService.post(newTask).subscribe(task => {
        expect(task.id).toBe(newTask.id);
        expect(task).toEqual(newTask);
      });

      const request = httpMock.expectOne(`${tasksService.url}`);
      expect(request.request.method).toBe('POST');

      request.flush(newTask);
  });

  it('should update a task', () => {
      const updatedTask: Task =  { id: 1, description: 'A', status: 'Pending' };

      tasksService.update(updatedTask).subscribe(task => {
        expect(task.id).toBe(updatedTask.id);
        expect(task).toEqual(updatedTask);
      });

      const request = httpMock.expectOne(`${tasksService.url}`);
      expect(request.request.method).toBe('PUT');

      request.flush(updatedTask);
  });

  it('should return a task', () => {
      const requestedTask: Task =  { id: 1, description: 'A', status: 'Pending' };
      const id = 1;

      tasksService.getById(id).subscribe(task => {
        expect(requestedTask.id).toBe(id);
      });

      const request = httpMock.expectOne(`${tasksService.url}/${id}`);
      expect(request.request.method).toBe('GET');

      request.flush(requestedTask);
  });

  it('should delete the task', () => {
      const requestedTask: Task =  { id: 1, description: 'A', status: 'Pending' };
      const id = 1;

      tasksService.delete(id).subscribe(task => {
        expect(requestedTask.id).toBe(id);
      });

      const request = httpMock.expectOne(`${tasksService.url}/${id}`);
      expect(request.request.method).toBe('DELETE');

      request.flush(requestedTask);
  });
});
