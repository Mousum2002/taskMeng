import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map } from "rxjs/internal/operators/map";
import { Observable, throwError,catchError } from "rxjs";
import { LoggingService } from "./Logging.Service";


@Injectable({
    providedIn: 'root'
})
export class TaskService { 
    http: HttpClient = inject(HttpClient);
    allTasks: Task[] = [];
    CreateTask(data: Task){
        const header = new HttpHeaders({
              'MyHeader': 'hello world'
            });
        return this.http.post<{name:string}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json',data,
            {headers: header});
    }

    fatchTasks(){    
    return this.http.get<{[key:string]: Task}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json').pipe(map((response)=>{
      let tasks = [];
      for(let key in response){
        if(response.hasOwnProperty(key)){
        tasks.push({...response[key], id: key})}
      }
      return tasks;}))}
  
    updateTask(data: Task):Observable<Task>{
       return this.http.put<Task>(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${data.id}.json`, data);
    }

    deleteTask(taskId: string | undefined){
    return this.http.delete(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${taskId}.json`)}

    deleteAllTasks(){
        return this.http.delete('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json');}
}