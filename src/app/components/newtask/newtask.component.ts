import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/interfaces/itask';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewTaskComponent implements OnInit {

  newTasksAdded: ITask;
  newTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tasksService: TasksService) { }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      description: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit() {
    if (this.newTaskForm.valid) {
      this.tasksService.postTask(this.newTaskForm.value).subscribe(resp => { this.newTasksAdded = resp;
      }, error => {console.log('ERROR!'); });
    } else {
      console.log('Invalid!');
    }
  }
}
