import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { NewTaskComponent } from './components/newtask/newtask.component';


const routes: Routes = [
  { path: 'home',    component: TasksComponent },
  { path: 'newtask', component: NewTaskComponent },
  { path: '**',      component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
