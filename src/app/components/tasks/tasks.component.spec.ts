import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from 'src/app/services/tasks.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent
      ],
      imports: [
        DragDropModule
      ],
      providers: [
        { provide: TasksService, useValue: mockTasksService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TasksService', [ 'getAll', 'post' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: TasksService, useValue: mockTasksService }
      ],
    });

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockTasksService = TestBed.get(TasksService);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
    });

  // it('should return something', () => {
  //   let result = undefined;
  //   expect(result).toBeUndefined();
  // });
});
