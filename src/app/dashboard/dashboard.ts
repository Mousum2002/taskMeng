import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CreateTask } from './create-task/create-task';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../Services/task.service';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTask, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  //these is not an optimal design as some the buiness logic is still in the component, should be moved to the service implementing signals. for now just to demo only
   showCreateTaskForm: boolean = false;
   http:HttpClient = inject(HttpClient);
   cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
   taskService: TaskService = inject(TaskService);
   allTasks: Task[] = [];

   isLoading:boolean = false;
   

   editMode: boolean = false;
   selectedTask: Task;

   ngOnInit(){
    this.fetchTasks();

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
      
      this.taskService.updateTask(data).subscribe(()=>{
        this.updateTask(data);
        this.editMode = false;
        this.selectedTask = null;
        this.fetchTasks();
      });
    }
    else{
     this.taskService.CreateTask(data).subscribe((response)=>{
      console.log(response);
      this.allTasks.push({...data, id: response.name});
      this.cdr.detectChanges(); });
     }
  }

  private fetchTasks(){
    this.isLoading = true;
    this.taskService.fatchTasks().subscribe
    ((tasks)=>{
      this.allTasks = tasks;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  FetchTasks(){
    this.fetchTasks();
  }

  deleteTask(taskId: string | undefined){
    if(!taskId) return;
    this.taskService.deleteTask(taskId).subscribe(()=>{
      //same reson as above, to not make double request
      this.allTasks = this.allTasks.filter(task => task.id !== taskId);
      this.cdr.detectChanges();
    });
  }

  deleteAllTasks(){
    this.taskService.deleteAllTasks().subscribe(()=>{
      this.allTasks = [];
      this.cdr.detectChanges();
    });
  }

  EditTask(taskId: string | undefined){
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectedTask = this.allTasks.find((task) =>{return task.id === taskId});
    console.log(this.selectedTask);
    this.cdr.detectChanges();
  }




}
