import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  @Input() taskData: Task; 
  @Output() inShowDetails = new EventEmitter<boolean>();

  onCloseDetails(){
    this.inShowDetails.emit(false);
  }

}
