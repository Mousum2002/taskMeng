import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Loader } from '../utility/loader/loader';
import { Snackbar } from '../utility/snackbar/snackbar';
import { LoggingService } from '../Services/Logging.Service';
import { Observable } from 'rxjs';
import { AuthResponses } from '../Model/AuthResponse';

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
  authObs: Observable<AuthResponses>;

  toggleMode(formData: NgForm){
    this.isLoggingMode = !this.isLoggingMode;
    formData.reset();
  }

  onSubmit(formData: NgForm){ 

    if(this.isLoggingMode){
      this.authObs = this.authService.signIn(formData.value.email, formData.value.password)
    } else {
      this.authObs = this.authService.signUp(formData.value.email, formData.value.password)
    }
    this.authObs.subscribe({next:()=>{
        this.ifLoading = false;
        this.cdr.detectChanges();}, 
        error: (err)=>{
          this.errorLogger.logError({statusCode: err.status, errorMessage: err.message, dateTime: new Date()});
          this.ifLoading = false;
          this.errorMeg = err;
          this.cdr.detectChanges();
          setTimeout(() => {
          this.errorMeg = null;
          this.cdr.detectChanges();}, 4000);
        }
      });
    formData.reset();
  }
}
