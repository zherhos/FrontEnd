import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DragDropModule, DropListRef } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/classes/task';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DragDropEventFactory, ContainerModel } from 'src/app/classes/drag-drop-event-factory';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let tasksService: TasksService;
  let fixture: ComponentFixture<TasksComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let tasks: Task[];
  let tasksAux: Task[];

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

    tasksAux = [
      { id: 1, description: 'MockAux result 1', status: 'Pending' },
      { id: 2, description: 'MockAux result 2', status: 'Completed' },
      { id: 3, description: 'MockAux result 3', status: 'Pending' },
      { id: 4, description: 'MockAux result 4', status: 'Completed' }
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

  it('should populate tasksCompleted and tasksPending', () => {
    const service = component.getService();

    spyOn(service, 'getAll').and.returnValues(of(tasks));
    component.ngOnInit();

    expect(component.tasksCompleted.length).toBeGreaterThan(0);
    expect(component.tasksPending.length).toBeGreaterThan(0);
  });

  it('should increase the length of tasksPending', () => {
    const oldTasksPendingLength = component.tasksPending.length;
    component.ngOnChanges({
      taskToAdd: new SimpleChange('taskToAdd', { id: 10, description: 'This is a test!', status: 'Completed' } , false)
    });
    fixture.detectChanges();

    expect(oldTasksPendingLength).toBeLessThan(component.tasksPending.length);
  });

  it('should update the status of the task from "Pending" to "Completed"', () => {
    const index = 2;
    const oldStatus = tasks[index].status;
    component.updateStatus(tasks, index);

    expect(tasks[index].status).not.toEqual(oldStatus);
  });

  it('should move the position of the task in the array', () => {
    const dragDropEventFactory: DragDropEventFactory<Task> = new DragDropEventFactory<Task>();
    const event = dragDropEventFactory.createInContainerEvent('tasks', tasks, 0, 1);

    component.drop(event);
    expect(tasks[1].id).toBe(1);
  });

  it('should move the position between arrays', () => {
    const dragDropEventFactory: DragDropEventFactory<Task> = new DragDropEventFactory<Task>();
    const containerTasks: ContainerModel<Task> = {
      id: 'tasks',
      data: tasks,
      index: 1
    };
    const containerTasksAux: ContainerModel<Task> = {
      id: 'tasksAux',
      data: tasksAux,
      index: 1
    };
    const event = dragDropEventFactory.createCrossContainerEvent(containerTasks, containerTasksAux);

    component.drop(event);
    expect(tasks[1].description).toBe('Mock result 3');
    expect(tasksAux[1].description).toBe('Mock result 2');
  });
});

