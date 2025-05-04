// src/app/app.component.ts
import { Component } from '@angular/core';
// Asegúrate que estos imports estén presentes
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive // Sigue siendo necesario para la directiva [routerLinkActive]
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica-angular';
}