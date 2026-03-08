import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);  
  isLoggingMode: boolean = true;

  toggleMode(){
    this.isLoggingMode = !this.isLoggingMode;
    this.cdr.detectChanges();
  }

  onSubmit(formData: NgForm){
    console.log(formData);
  }
}
