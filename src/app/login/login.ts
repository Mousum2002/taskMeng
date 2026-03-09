import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Loader } from '../utility/loader/loader';
import { Snackbar } from '../utility/snackbar/snackbar';
import { LoggingService } from '../Services/Logging.Service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Loader, Snackbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorLogger: LoggingService = inject(LoggingService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);  
  isLoggingMode: boolean = true;
  authService: AuthService = inject(AuthService);
  ifLoading: boolean = false;
  errorMeg: string | null = null;

  toggleMode(formData: NgForm){
    this.isLoggingMode = !this.isLoggingMode;
    formData.reset();
  }

  onSubmit(formData: NgForm){
    console.log(formData.value);
    if(this.isLoggingMode){
      this.authService;
    } else {
      this.ifLoading = true;
      this.cdr.detectChanges();
      this.authService.signUp(formData.value.email, formData.value.password).subscribe({next:(res)=>{
        this.ifLoading = false;
        this.cdr.detectChanges();}, 
        error: (err)=>{
          this.errorLogger.logError({statusCode: err.status, errorMessage: err.message, dateTime: new Date()});
          this.ifLoading = false;
          switch(err.error.error.message){
            case "EMAIL_EXISTS":
              this.errorMeg = "An account with this email already exists.";
              break;
            
              case "OPERATION_NOT_ALLOWED":
              this.errorMeg = "Password sign-in is disabled for this project.";
              break;
            
              case "TOO_MANY_ATTEMPTS_TRY_LATER":
              this.errorMeg = "Too many unsuccessful login attempts. Please try again later.";
              break;
            
            default:
              this.errorMeg = "An error occurred while signing up. Please try again.";
          }
          this.cdr.detectChanges();
          setTimeout(() => {
          this.errorMeg = null;
          this.cdr.detectChanges();}, 4000);
        }
      });
    }
    formData.reset();
  }
}
