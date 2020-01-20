import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/classes/task';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let tasksService: TasksService;
  let fixture: ComponentFixture<TasksComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let tasks: Task[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent
      ],
      imports: [
        DragDropModule,
        HttpClientTestingModule
      ],
      providers: [
        TasksService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.get(TasksService);

    tasks = [
      { id: 1, description: 'Mock result 1', status: 'Pending' },
      { id: 2, description: 'Mock result 2', status: 'Completed' },
      { id: 3, description: 'Mock result 3', status: 'Pending' },
      { id: 4, description: 'Mock result 4', status: 'Completed' }
    ];

    fixture.detectChanges();
  });

  it('should return "Tasks Overview"', () => {
    debugElement = fixture.debugElement.query(By.css('h2'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toEqual('Tasks Overview');
  });

  it('should return "#DescriptionStatus"', () => {
    debugElement = fixture.debugElement.query(By.css('thead'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toEqual('#DescriptionStatus');
  });

  it('should update the status of the task to "Completed"', () => {
    component.updateStatusInMemory(tasks, 0);

    expect(tasks[0].status).toBe('Completed');
  });

  it('should update the status of the task to "Pending"', () => {
    component.updateStatusInMemory(tasks, 1);

    expect(tasks[1].status).toBe('Pending');
  });
});
