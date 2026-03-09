import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map } from "rxjs/internal/operators/map";
import { Observable, throwError,catchError, Subject, take, exhaustMap } from "rxjs";

import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class TaskService { 
    http: HttpClient = inject(HttpClient);
    authService: AuthService = inject(AuthService);

    CreateTask(data: Task){
        return this.http.post<{name:string}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json',data,
            );
    }

    fetchTasks() {
  return this.http.get<{[key: string]: Task}>('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json').pipe(
    map(response => {
      const tasks: Task[] = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          tasks.push({ ...response[key], id: key });
        }
      }
      return tasks;
    })
  );
}

    
  
    updateTask(data: Task):Observable<Task>{
       return this.http.put<Task>(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${data.id}.json`, data);
    }

    deleteTask(taskId: string | undefined){
    return this.http.delete(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${taskId}.json`)}

    deleteAllTasks(){
        return this.http.delete('https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks.json');}
}