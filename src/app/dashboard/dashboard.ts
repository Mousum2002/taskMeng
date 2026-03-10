import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Subject } from 'rxjs';
import { TaskService } from '../Services/task.service';
import { LoggingService } from '../Services/Logging.Service';
import { TaskDetails } from "./task-details/task-details";
import { Loader } from '../utility/loader/loader';
import { Snackbar } from '../utility/snackbar/snackbar';



@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, CommonModule, TaskDetails,Loader,Snackbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  //these is not an optimal design as some the buiness logic is still in the component, should be moved to the service implementing signals. i am using manual change ditection for practice only
  loggingService: LoggingService = inject(LoggingService); 
  showCreateTaskForm: boolean = false;
   http:HttpClient = inject(HttpClient);
   cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
   taskService: TaskService = inject(TaskService);
   allTasks: Task[] = [];

   isLoading:boolean = false;
   error$ = new Subject<HttpErrorResponse>;
   errorMeg:string| null= null;
   

   editMode: boolean = false;
   selectedTask: Task;



   ngOnInit(){
    this.fetchTasks();
    this.error$.subscribe((err)=>{this.handleError(err)});
   }

   ngOnDestroy(){
    this.error$.unsubscribe();
   }

   updateTask(updated: Task) {
    this.allTasks = this.allTasks.map(task =>
      task.id === updated.id ? { ...task, ...updated } : task
    )
    console.log(this.allTasks);
    this.cdr.detectChanges()}

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = null;
    this.cdr.detectChanges();  
  }
  

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  CreateTask(data: Task){
  // cloud use this.fetchTasks() to get the updated list of tasks but to avoid extra http request we can directly update the allTasks array with the new task data
  // a fetch button will be provided just in case
    if(this.editMode){
      this.taskService.updateTask(data).subscribe({next: ()=>{
        this.updateTask(data);
        this.editMode = false;
        this.selectedTask = null;
        this.fetchTasks();
      }, 
      error: (err)=>{
        this.error$.next(err);
      }});
    }
    else{
     this.taskService.CreateTask(data).subscribe({next: (response)=>{
      console.log(response);
      this.allTasks.push({...data, id: response.name});
      this.cdr.detectChanges(); }, 
      error: (err)=>{
        this.error$.next(err);
      }});
     }
  }

  private fetchTasks(){
    this.isLoading = true;
    this.taskService.fetchTasks().subscribe
    ({next:(tasks)=>{
      this.allTasks = tasks;
      this.isLoading = false;
      this.cdr.detectChanges();}, 
      error: (err)=>{
        this.isLoading = false;
        this.error$.next(err);
      }
    });
  }

  FetchTasks(){
    this.fetchTasks();
  }

  deleteTask(taskId: string | undefined){
    if(!taskId) return;
    this.taskService.deleteTask(taskId).subscribe({next: ()=>{
      //same reson as above, to not make double request
      this.allTasks = this.allTasks.filter(task => task.id !== taskId);
      this.cdr.detectChanges();
    }, 
    error: (err)=>{
      this.error$.next(err);
    }
});
  }

  deleteAllTasks(){
    confirm("Are you sure you want to delete all tasks?") &&
    this.taskService.deleteAllTasks().subscribe({next: ()=>{
      this.allTasks = [];
      this.cdr.detectChanges();
    }, 
    error: (err)=>{
      this.error$.next(err);
    }});
  }

  EditTask(taskId: string | undefined){
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectedTask = this.allTasks.find((task) =>{return task.id === taskId});
    console.log(this.selectedTask);
    this.cdr.detectChanges();
  }

  handleError(err: HttpErrorResponse){
    this.loggingService.logError({statusCode: err.status, errorMessage: err.message, dateTime: new Date()});
    if(err.error.error === "Permission denied"){
      this.errorMeg = "You don't have permission to perform this action.";
      
      this.cdr.detectChanges();
      setTimeout(() => {
        this.errorMeg = null;
        this.cdr.detectChanges();
      }, 4000);
    }
    else{
      this.errorMeg = "An unexpected error occurred. Please try again later.";
      this.cdr.detectChanges();
      console.log(err);
      setTimeout(() => {
        this.errorMeg = null;
        this.cdr.detectChanges();
      }, 4000);
    }

  }

  showDetailsTaks:boolean = false;
  showDetails(show: boolean){
    this.showDetailsTaks = show;
  }
  closeDetails(){
    this.showDetailsTaks = false;
    this.selectedTask = null;
    this.cdr.detectChanges();
  }

}
