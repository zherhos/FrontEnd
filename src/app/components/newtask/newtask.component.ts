import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/interfaces/itask';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css'],
  styles: [
    `.ng-invalid.ng-touched:not(form) { border:1px solid red }`
  ]
})
export class NewTaskComponent implements OnInit {

  newTasksAdded: ITask;
  newTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tasksService: TasksService) { }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(35)]],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit() {
    this.newTaskForm.markAsTouched();

    if (this.newTaskForm.valid) {
      this.tasksService.post(this.newTaskForm.value).subscribe(
        resp => { this.newTasksAdded = resp; },
        error => { throw new Error (`Server could not be reached: ${error}`); }
      );
    }
  }

  getService() {
    return this.tasksService;
  }
}
