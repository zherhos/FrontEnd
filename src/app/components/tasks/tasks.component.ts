import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/interfaces/itask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() taskToAdd: ITask;
  tasksCompleted: ITask[] = [];
  tasksPending: ITask[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {

    this.tasksService.getAllTasks().subscribe(resp => { resp.forEach( (task) => {
       if (task.status === 'Completed') {
        this.tasksCompleted.push(task);
       } else {
        this.tasksPending.push(task);
       }
     }); },
    error => { console.log('ERROR!'); });
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

}
