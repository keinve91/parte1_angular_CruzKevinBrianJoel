// src/app/services/ahorcado.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  categoriasYPalabras: { [key: string]: string[] } = {
    'Animales': [
      'perro', 'gato', 'elefante', 'jirafa', 'leon', 'tigre', 'cocodrilo',
      'rinoceronte', 'hipopotamo', 'cebra', 'mono', 'serpiente', 'aguila',
      'tiburon', 'ballena', 'delfin', 'caballo', 'vaca', 'oveja', 'conejo'
    ],
    'Frutas': [
      'manzana', 'banana', 'naranja', 'uva', 'pera', 'frutilla', 'sandia',
      'melon', 'anana', 'kiwi', 'mango', 'cereza', 'limon', 'pomelo',
      'mandarina', 'durazno', 'ciruela', 'higo'
    ],
    'Países': [
      'argentina', 'brasil', 'chile', 'españa', 'francia', 'italia', 'alemania',
      'mexico', 'japon', 'canada', 'australia', 'rusia', 'china', 'india',
      'egipto', 'sudafrica', 'nigeria', 'colombia', 'peru', 'uruguay'
    ],
    'Deportes': [
      'futbol', 'baloncesto', 'tenis', 'voleibol', 'natacion', 'atletismo',
      'ciclismo', 'boxeo', 'rugby', 'golf', 'beisbol', 'hockey', 'karate',
      'judo', 'esgrima', 'remo', 'surf'
    ],
    'Profesiones': [
      'medico', 'ingeniero', 'profesor', 'abogado', 'programador', 'bombero',
      'policia', 'cocinero', 'musico', 'artista', 'periodista', 'dentista',
      'veterinario', 'arquitecto', 'contador', 'electricista', 'carpintero',
      'cientifico'
    ],
    'Colores': [
      'rojo', 'azul', 'verde', 'amarillo', 'naranja', 'morado', 'violeta',
      'blanco', 'negro', 'gris', 'marron', 'rosa', 'celeste', 'turquesa',
      'beige', 'dorado', 'plateado'
    ]
  };

  categoria: string = ''; // La categoría se elegirá dinámicamente
  palabraElegida: string = '';
  letrasAdivinadas: string[] = [];
  intentosRestantes: number = 6; // Aumentamos un intento por defecto

  constructor() {
    // Opcional: Iniciar el juego al crear el servicio,
    // aunque generalmente se llama desde un componente.
    // this.iniciarJuego();
  }

  iniciarJuego(): void {
    // 1. Obtener la lista de nombres de categorías disponibles
    const categoriasDisponibles = Object.keys(this.categoriasYPalabras);

    // 2. Elegir una categoría al azar
    const indiceCategoria = Math.floor(Math.random() * categoriasDisponibles.length);
    this.categoria = categoriasDisponibles[indiceCategoria];

    // 3. Obtener la lista de palabras para la categoría elegida
    const palabrasDeCategoria = this.categoriasYPalabras[this.categoria];

    // 4. Elegir una palabra al azar de esa lista
    const indicePalabra = Math.floor(Math.random() * palabrasDeCategoria.length);
    this.palabraElegida = palabrasDeCategoria[indicePalabra].toLowerCase(); // Asegurarse que esté en minúsculas

    // 5. Reiniciar el estado del juego
    this.letrasAdivinadas = [];
    this.intentosRestantes = 6; // Reiniciar intentos

    console.log(`Nuevo juego iniciado. Categoría: ${this.categoria}, Palabra: ${this.palabraElegida}`); // Útil para depuración
  }

  adivinarLetra(letra: string): boolean {
    const letraNormalizada = letra.toLowerCase(); // Normalizar a minúscula

    // Evitar procesar la misma letra incorrecta varias veces o letras ya adivinadas
    if (this.letrasAdivinadas.includes(letraNormalizada) || this.intentosRestantes <= 0 || this.juegoGanado()) {
        return false; // No hacer nada si la letra ya fue adivinada o el juego terminó
    }

    if (this.palabraElegida.includes(letraNormalizada)) {
      // Si la letra es correcta y no estaba adivinada, añadirla
      if (!this.letrasAdivinadas.includes(letraNormalizada)) {
          this.letrasAdivinadas.push(letraNormalizada);
      }
      return true;
    } else {
      // Si la letra es incorrecta, descontar un intento
      this.intentosRestantes--;
      return false;
    }
  }

  obtenerPalabraFormada(): string {
    if (!this.palabraElegida) return ''; // Asegurar que hay una palabra elegida

    return this.palabraElegida
      .split('')
      .map(l => this.letrasAdivinadas.includes(l) ? l : '_')
      .join(' ');
  }

  juegoPerdido(): boolean {
    return this.intentosRestantes <= 0;
  }

  juegoGanado(): boolean {
    // El juego se gana si no quedan guiones bajos en la palabra formada
    // y debe haber una palabra elegida
    return !!this.palabraElegida && !this.obtenerPalabraFormada().includes('_');
  }
}
