import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/interfaces/itask';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() taskToAdd: ITask;

  tasksCompleted: ITask[] = [];
  tasksPending: ITask[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getAll().subscribe(
      resp => {
        resp.forEach(task => {
          if (task.status === 'Completed') {
            this.tasksCompleted.push(task);
          } else {
            this.tasksPending.push(task);
          }
        });
      },
      error => { throw new Error (`Server could not be reached: ${error}`); }
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.catchNewTaskCreated(changes);
  }

  catchNewTaskCreated(changes: SimpleChanges) {
    if (changes.taskToAdd && !changes.taskToAdd.firstChange) {

      const newTask = changes.taskToAdd.currentValue as ITask;
      this.tasksPending.push(newTask);
    }
  }

  drop(event: CdkDragDrop<ITask[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateStatus(event.previousContainer.data, event.previousIndex);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateStatus(tasks: ITask[], index: number) {
    this.updateStatusInMemory(tasks, index);
    this.updateStatusInDB(tasks, index);
  }

  updateStatusInDB(tasks: ITask[], index: number) {
    this.tasksService.update(tasks[index]).subscribe(
      resp => { },
      error => {
        this.updateStatusInMemory(tasks, index);
        throw new Error('The server could not be reached!');
    });
  }

  updateStatusInMemory(tasks: ITask[], index: number) {
    switch (tasks[index].status) {
      case 'Completed': {
        tasks[index].status = 'Pending';
        break;
      }
      case 'Pending': {
        tasks[index].status = 'Completed';
        break;
      }
    }
  }

  getService() {
    return this.tasksService;
  }
}
