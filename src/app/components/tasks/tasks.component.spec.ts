import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TasksService } from 'src/app/services/tasks.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTasksService: TasksService;
  let TASKS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      providers: [
        { provide: TasksService, useValue: mockTasksService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TASKS = [
      {id: 1, description: 'Jarl', status: 'Pending' },
      {id: 2, description: 'Jerl', status: 'Pending' },
      {id: 3, description: 'Jirl', status: 'Pending' }
    ];
    mockTasksService = jasmine.createSpyObj( [ 'getAllTasks', 'postTask' ]);
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //mockTasksService.getAllTasks.and.returnValue(of(TASKS));
    fixture.detectChanges();

    expect(fixture.componentInstance.tasksCompleted.length).toBeTruthy();
  });
});
