import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('taskMeng');
}
