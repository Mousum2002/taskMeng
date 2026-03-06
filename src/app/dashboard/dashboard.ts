import { Component } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/Task';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, CommonModule],
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
  CreateTask(data: Task){
    console.log(data);
  }

}
