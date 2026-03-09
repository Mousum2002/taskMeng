import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { AuthResponses } from "../Model/AuthResponse";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";
import { Subject, tap } from "rxjs";
import { User } from "../Model/User";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);
    user = new Subject<User>();

    signIn<AuthResponses>(username: string, password: string){
      const data = {email: username, password: password, returnSecureToken: true};
      return this.http.post<AuthResponses>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcZ7jhkygh28Atoe5r9Us4371w6ETuYf4",data ).
      pipe(catchError(this.handleError), tap((resData:AuthResponses) => {
        console.log(resData);
      }
    ));};
     signUp<AuthResponses>(username: string, password: string){
        const data = {email: username, password: password, returnSecureToken: true};
        return this.http.post<AuthResponses>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcZ7jhkygh28Atoe5r9Us4371w6ETuYf4", data).
        pipe(catchError(this.handleError), tap((resData:AuthResponses) => {
          console.log(resData);
        }));
     }

     private handleError(err: any){
        console.log(err);
        let errorMessage = "An unknown error occurred!";
         switch(err.error.error.message){
            case "EMAIL_EXISTS":
              errorMessage = "An account with this email already exists.";
              break;
              case "OPERATION_NOT_ALLOWED":
            errorMessage = "Password sign-in is disabled for this project.";
              break;
              case "TOO_MANY_ATTEMPTS_TRY_LATER":
              errorMessage = "Too many unsuccessful login attempts. Please try again later.";
              break;
              /*
              backend is configured to not return these errors for security reasons, but if it did (turning of Email Enumeration Protection), these would be the error messages:
              case "EMAIL_NOT_FOUND":
              errorMessage = "No account found with this email.";
              break;
              case "INVALID_PASSWORD":
              errorMessage = "The password is invalid.";
              break;
              */
              case "USER_DISABLED":
              errorMessage = "YOU BANNED!!! GO AWAY!!!";
              break;
              case "INVALID_LOGIN_CREDENTIALS":
              errorMessage = "Invalid email or password.";
              break;
             }
            return throwError(() => errorMessage);
     }

}