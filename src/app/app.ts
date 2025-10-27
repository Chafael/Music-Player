import { Component, signal } from '@angular/core';
import { Home } from './presentation/home/home';

@Component({
  selector: 'app-root',
  imports: [Home],  // ← Sin RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Music-Player');
}