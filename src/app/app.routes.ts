import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { canActivate } from './RouteGurds/authGurd';
import { Dashboard } from './dashboard/dashboard';
import { Stats } from './dashboard/stats/stats';


export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [canActivate], 
  },
  { path: 'login', component: Login }
];
