import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
   @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();
  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  OnFormSubmit(form:NgForm){
    this.EmitTaskData.emit(new Task(form.value.title, form.value.description, form.value.assignTo,form.value.createdAt,form.value.priority, form.value.status, this.taskData?.id));
    this.CloseForm.emit(false);
  }

  @Input()
  isEditMode: boolean = false;

  @Input()
  taskData: Task | null = null;

  @ViewChild('taskForm') taskForm: NgForm;

  ngAfterViewInit(){
    setTimeout(() => {
    this.taskForm.form.patchValue(this.taskData);
  },0);
  }



    
  }

