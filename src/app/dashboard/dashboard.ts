import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
   showCreateTaskForm: boolean = false;
   http:HttpClient = inject(HttpClient);
   allTasks: Task[] = [];
   cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

   ngOnInit(){
    this.fetchTasks();
   }


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

  private fetchTasks(){
    this.http.get<{[key:string]: Task}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json').pipe(map((response)=>{
      let tasks = [];
      for(let key in response){
        if(response.hasOwnProperty(key)){
        tasks.push({...response[key], id: key})}
      }
      return tasks;
    })).subscribe
    ((tasks)=>{
      this.allTasks = tasks;
      this.cdr.detectChanges();
      console.log(this.allTasks.map(t => t.id))
      console.log(this.allTasks.length);
    });
  }

}
