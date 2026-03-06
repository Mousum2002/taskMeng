import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-task',
  imports: [],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
   @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

}
