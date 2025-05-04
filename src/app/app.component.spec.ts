// src/app/app.component.ts
import { Component } from '@angular/core';
// Importa RouterOutlet Y TAMBIÉN RouterLink, RouterLinkActive
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Es buena práctica añadirlo explícitamente
  imports: [
    RouterOutlet,
    RouterLink,     // <--- Añadido
    RouterLinkActive // <--- Añadido
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica-angular'; // Mantenemos tu propiedad title
}