import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AhorcadoService } from '../services/ahorcado.service';

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule, FormsModule],  // 👈 agregás FormsModule acá
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})
export class Punto3Component implements OnInit {

  abecedario: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  letrasUsadas: string[] = [];
  mostrarModal: boolean = false;
  mensajeModal: string = '';

  constructor(public ahorcadoService: AhorcadoService) { }

  ngOnInit(): void {
    this.ahorcadoService.iniciarJuego();
    this.letrasUsadas = [];
  }

  enviarLetra(letra: string): void {
    if (!this.letrasUsadas.includes(letra)) {
      this.letrasUsadas.push(letra);

      const acierto = this.ahorcadoService.adivinarLetra(letra);

      if (this.ahorcadoService.juegoPerdido()) {
        this.mensajeModal = '¡Has perdido! La palabra era: ' + this.ahorcadoService.palabraElegida;
        this.mostrarModal = true;
      } else if (this.ahorcadoService.juegoGanado()) {
        this.mensajeModal = '🎉 ¡Felicitaciones, has ganado!';
        this.mostrarModal = true;
      }
    }
  }

  nuevoJuego(): void {
    this.ahorcadoService.iniciarJuego();
    this.mostrarModal = false;
    this.letrasUsadas = [];
  }

  obtenerImagenEstado(): string {
    const intentos = this.ahorcadoService.intentosRestantes;
    return `ahorcado${6 - intentos}.png`;
  }
}
