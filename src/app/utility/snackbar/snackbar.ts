import { Component, Input } from '@angular/core';
import { WritableSignal } from '@angular/core';


@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {
  @Input() errorMeg: string |null | WritableSignal<string | null> = null;
 
}
