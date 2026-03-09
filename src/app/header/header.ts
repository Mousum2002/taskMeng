import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../Services/auth.service';
import { Subject, Subscription } from 'rxjs';
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
  private userSub: Subscription;

  isLoggedIn: boolean = false;
  ngOnInit(){
    this.userSub = this.authservie.user.subscribe(user => {
      this.isLoggedIn = user ? true : false;
    });
  }


  ngOnDestroy(){
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onLogout(){
    this.authservie.logOut();
  }
}
