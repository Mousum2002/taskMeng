import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../Services/auth.service';
import { Subject } from 'rxjs';
import { User } from '../Model/User';



@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authservie: AuthService = inject(AuthService);

  user:Subject<User> = this.authservie.user;

  isLoggedIn: boolean = false;
  ngOnInit(){
    this.authservie.user.subscribe(user => {
      console.log(user);
      this.isLoggedIn = user ? true : false;
    });
  }

  ngOnDestroy(){
    this.authservie.user.unsubscribe();
  }

}
