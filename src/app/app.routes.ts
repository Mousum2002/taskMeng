import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { Login } from './login/login';
import { canActivate } from './RouteGurds/authGurd';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'dashboard', component: Dashboard, canActivate: [canActivate]},
    {path: 'login', component: Login},
];
