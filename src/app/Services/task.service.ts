import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map } from "rxjs/internal/operators/map";
import { Observable, throwError,catchError, Subject, take, exhaustMap } from "rxjs";

import { AuthService } from "./auth.service";
import { User } from "../Model/User";


@Injectable({
    providedIn: 'root'
})
export class TaskService { 
    http: HttpClient = inject(HttpClient);
    authService: AuthService = inject(AuthService);
    private getUid(): string {
    const stored = localStorage.getItem('user');
    if (!stored) {
      throw new Error('User not logged in');
    }
    const user = JSON.parse(stored) as { id: string };
    return user.id;
  }

    CreateTask(data: Task){
      
      const uid = this.getUid();
      return this.http.post<{ name: string }>(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${uid}.json`,data);}

    fetchTasks() {
    const uid = this.getUid();
    return this.http.get<{[key: string]: Task}>(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${uid}.json`).pipe(
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
      const uid = this.getUid();
       return this.http.put<Task>(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${uid}/${data.id}.json`, data);
    }

    deleteTask(taskId: string | undefined){
      const uid = this.getUid();
    return this.http.delete(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${uid}/${taskId}.json`)}

    deleteAllTasks(){
      const uid = this.getUid();
       return this.http.delete(`https://angularhttpclient-c80a8-default-rtdb.firebaseio.com/tasks/${uid}.json`);}
}