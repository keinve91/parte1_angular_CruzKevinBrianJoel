import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf, [src], etc.

// Definimos una interfaz para la estructura de nuestras noticias (buena práctica)
interface Noticia {
  titulo: string;
  noticia: string;
  img: string; // Nombre del archivo de imagen
}

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})
export class Punto1Component {
  // Array de noticias como fuente de datos
  noticias: Noticia[] = [
    {
      titulo: 'Aumentaron las denuncias y los casos de maltrato animal en Jujuy',
      noticia: 'Desde el Instituto de Derecho Animal hablaron sobre la situación actual en la provincia por denuncias y casos de maltrato animal.',
      img: 'noti1.jpg' // Asegúrate que esta imagen exista en /src/assets/images/
    },
    {
      titulo: 'Más líneas de colectivos de Jujuy habilitan el pago de la SUBE con tarjetas o celular',
      noticia: 'SUBE incorporó más líneas de colectivos en Jujuy para pagar pasajes con nuevos medios de pago como tarjetas o celulares.',
      img: 'noti2.jpg' // Asegúrate que esta imagen exista en /src/assets/images/
    },
    {
      titulo: 'En mayo aumentan las tarifas de luz y gas en todo el país: de cuánto es la suba',
      noticia: 'El incremento será efectivo para los consumos realizados desde el 1° de mayo, según indicó el secretario coordinador de Energía, Daniel González.',
      img: 'noti3.jpg' // Asegúrate que esta imagen exista en /src/assets/images/
    },
    {
      titulo: 'Buscan incrementar el consumo de carne bovina en Jujuy',
      noticia: 'El "Plan Ganar" es una iniciativa destinada a aumentar la cantidad y calidad de carne bovina de producción jujeña.',
      img: 'noti4.webp' // Asegúrate que esta imagen exista en /src/assets/images/
    }
  ];

  // Índice de la noticia actualmente visible
  indiceActual: number = 0;

  // Método para mostrar la noticia siguiente
  siguienteNoticia(): void {
    this.indiceActual++;
    // Si el índice supera el último elemento, vuelve al primero
    if (this.indiceActual >= this.noticias.length) {
      this.indiceActual = 0;
    }
  }

  // Método para mostrar la noticia anterior
  anteriorNoticia(): void {
    this.indiceActual--;
    // Si el índice es menor que cero, va al último elemento
    if (this.indiceActual < 0) {
      this.indiceActual = this.noticias.length - 1;
    }
  }

  // Método auxiliar para obtener la noticia actual (opcional, pero puede clarificar el template)
  get noticiaActual(): Noticia {
    return this.noticias[this.indiceActual];
  }
}