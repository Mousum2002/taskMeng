import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../Model/Task';


@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnChanges {

  @Input() tasks: Task[] = [];

  started = 0;
  total = 0;
  inProgress = 0;
  completed = 0;
  open = 0;
  //should be done using async pipe, but given that the operation is small i am not gonna redesign the parent component for these

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      const tasks = this.tasks || [];
      this.total      = tasks.length;
      this.started    = tasks.filter(t => t.status === 'started').length;
      this.inProgress = tasks.filter(t => t.status === 'in-progress').length;
      this.completed  = tasks.filter(t => t.status === 'complete').length;
      this.open       = tasks.filter(t => t.status === 'open').length;
    }
  }
}
