import { Component, inject } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   showCreateTaskForm: boolean = false;
   http:HttpClient = inject(HttpClient);
   

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  CreateTask(data: Task){
    const header = new HttpHeaders({
      'MyHeader': 'hello world'
    });
    this.http.post<{name:string}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json',data,
      {headers: header}).subscribe((response)=>{
      console.log(response);
    });
  }

}
