import { Component } from '@angular/core';
import { CreateTask } from './create-task/create-task';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTask],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   showCreateTaskForm: boolean = false;

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

}
