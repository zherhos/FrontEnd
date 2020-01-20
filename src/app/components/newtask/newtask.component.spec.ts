import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskComponent } from './newtask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/services/tasks.service';
import { of } from 'rxjs';
import { Task } from 'src/app/classes/task';

describe('NewtaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewTaskComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        TasksService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form', () => {
    debugElement = fixture.debugElement.query(By.css('form'));
    expect(debugElement).toBeTruthy();
  });

  it('should mark the form as touched', () => {
    component.onSubmit();
    expect(component.newTaskForm.touched).toBe(true);
  });

  it('should populate newTasksAdded', () => {
    const service = component.getService();

    spyOn(service, 'post').and.callFake((input: Task) => {
      return of(new Task());
    });
    component.newTaskForm.controls.description.setValue('This is a test!');
    component.newTaskForm.controls.status.setValue('Pending');
    component.onSubmit();

    expect(component.newTasksAdded).toBeTruthy();
  });

  it('should populate newTasksAdded', () => {
    const service = component.getService();

    spyOn(service, 'post').and.callFake((input: Task) => {
      return of(new Task());
    });
    component.newTaskForm.controls.description.setValue('This is a test!');
    component.newTaskForm.controls.status.setValue('Pending');
    component.onSubmit();

    expect(component.newTasksAdded).toBeTruthy();
  });
});
