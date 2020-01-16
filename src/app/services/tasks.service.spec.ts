import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  // it('should return an Observable', () => {
  //   const service: TasksService = TestBed.get(TasksService);
  //   expect(service.getAllTasks()).toHaveClass(Observable);
  // });
});
