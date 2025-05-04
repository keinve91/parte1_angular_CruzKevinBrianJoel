import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component {
  productos = [
    { nombre: 'Notebook Asus 13L', descripcion: 'Disco 40GB, 15 pulgadas', img: 'notebook.jpg', precio: 45.5 },
    { nombre: 'Monitor LG 14', descripcion: 'Texto descriptivo producto 02', img: 'monitor.jpg', precio: 99 },
    { nombre: 'Impresora Epson T20', descripcion: 'Alta calidad, inyección de tinta', img: 'impresora.jpg', precio: 75.3 }
  ];

  carrito: any[] = [];

  agregarAlCarrito(producto: any) {
    const item = this.carrito.find(i => i.producto.nombre === producto.nombre);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }
  

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }
  
  vaciarCarrito() {
    this.carrito = [];
  }
  modificarCantidad(item: any, cambio: number) {
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
      this.carrito = this.carrito.filter(i => i !== item);
    }
  }
  
  
}
