import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);  
  isLoggingMode: boolean = true;
  authService: AuthService = inject(AuthService);

  toggleMode(formData: NgForm){
    this.isLoggingMode = !this.isLoggingMode;
    formData.reset();
  }

  onSubmit(formData: NgForm){
    console.log(formData.value);
    if(this.isLoggingMode){
      return;
    } else {
      this.authService.signUp(formData.value.email, formData.value.password).subscribe((res)=>{
          console.log(res);});
    }
    formData.reset();
  }
}
