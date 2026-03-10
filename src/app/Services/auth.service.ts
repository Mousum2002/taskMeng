import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponses } from "../Model/AuthResponse";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}
    private tokenExpiretimer: any;

    signIn(username: string, password: string){
      const data = {email: username, password: password, returnSecureToken: true};
      return this.http.post<AuthResponses>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcZ7jhkygh28Atoe5r9Us4371w6ETuYf4",data ).
      pipe(catchError(this.handleError), tap((resData:AuthResponses) => {
        const user = new User(resData.email, resData.localId, resData.idToken, new Date(new Date().getTime() + +resData.expiresIn * 1000));
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('user', JSON.stringify(user));
      }
    ));};
     signUp(username: string, password: string){
        const data = {email: username, password: password, returnSecureToken: true};
        return this.http.post<AuthResponses>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcZ7jhkygh28Atoe5r9Us4371w6ETuYf4", data).
        pipe(catchError(this.handleError), tap((resData:AuthResponses) => {
          const user = new User(resData.email, resData.localId, resData.idToken, new Date(new Date().getTime() + +resData.expiresIn * 1000));
          this.user.next(user);
          this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(user));
        }));
     }

      autoLogin(){
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            return;
        }

        const loggedUser = new User(user.email, user.id, user._token, user._tokenExpirationDate)

        if(loggedUser.token){
           const expirationDate = new Date(loggedUser.tokenExpirationDate);
            this.user.next(loggedUser);
            const timerValue = expirationDate.getTime() - new Date().getTime();
            this.autoLogout(timerValue);
        }
    }

    autoLogout(expireTime: number){
        this.tokenExpiretimer = setTimeout(() => {
            this.logOut();
        }, expireTime);
    }

     logOut(){
        this.user.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('user');
        if(this.tokenExpiretimer){
            clearTimeout(this.tokenExpiretimer);
        }
        this.tokenExpiretimer = null;
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