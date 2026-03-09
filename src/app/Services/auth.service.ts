import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { AuthResponse } from "../Model/AuthResponse";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);

    signIn(username: string, password: string){}
     signUp(username: string, password: string){
        const data = {email: username, password: password, returnSecureToken: true};
        
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcZ7jhkygh28Atoe5r9Us4371w6ETuYf4", data);
     }
}