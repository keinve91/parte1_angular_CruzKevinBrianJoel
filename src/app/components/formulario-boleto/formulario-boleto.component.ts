import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Boleto, CategoriaTurista } from '../../models/boleto';
import { BoletoService } from '../../services/boleto.service';
import { ListaBoletosComponent } from '../lista-boletos/lista-boletos.component';
import { ResumenVentasComponent } from '../resumen-ventas/resumen-ventas.component';

@Component({
  selector: 'app-formulario-boleto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ListaBoletosComponent,
    ResumenVentasComponent
  ],
  templateUrl: './formulario-boleto.component.html',
  styleUrls: ['./formulario-boleto.component.css']
})

export class FormularioBoletoComponent {
  boleto: Partial<Boleto> = { // Usamos Partial para inicializarlo vacío
    dni: '',
    precioBase: undefined,
    categoriaTurista: undefined, // Sin categoría seleccionada por defecto
    email: ''
  };

  precioFinalCalculado: number | null = null;
  mostrarPrecioFinal = false;
  private boletoService = inject(BoletoService);
  categorias = CategoriaTurista;
  opcionesCategoria = [
    { valor: CategoriaTurista.Menor, texto: 'Menor (35% desc.)' },
    { valor: CategoriaTurista.Adulto, texto: 'Adulto (Sin desc.)' },
    { valor: CategoriaTurista.Jubilado, texto: 'Jubilado (50% desc.)' }
  ];

  calcularPrecioFinal(): void {
    if (this.boleto.precioBase && this.boleto.precioBase > 0 && this.boleto.categoriaTurista) {
      let precio = this.boleto.precioBase;
      switch (Number(this.boleto.categoriaTurista)) { // Convertir a número por si acaso
        case CategoriaTurista.Menor:
          this.precioFinalCalculado = precio * (1 - 0.35); // 35% descuento
          break;
        case CategoriaTurista.Jubilado:
          this.precioFinalCalculado = precio * (1 - 0.50); // 50% descuento
          break;
        case CategoriaTurista.Adulto:
          this.precioFinalCalculado = precio; // Sin descuento
          break;
        default:
          this.precioFinalCalculado = null; // Categoría inválida
          break;
      }

      this.mostrarPrecioFinal = this.precioFinalCalculado !== null;
    } else{
      this.precioFinalCalculado = null;
      this.mostrarPrecioFinal = false;
    }
  }



  registrarBoleto(): void {
    if (!this.boleto.dni || !this.boleto.precioBase || !this.boleto.categoriaTurista || !this.boleto.email) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (this.precioFinalCalculado === null) {
        alert('Error en el cálculo del precio final. Verifique los datos.');
        return;
    }

    const nuevoBoleto: Boleto = {
      dni: this.boleto.dni,
      precioBase: this.boleto.precioBase,
      categoriaTurista: Number(this.boleto.categoriaTurista), // Asegurarse que es número
      email: this.boleto.email,
      fechaCompra: new Date(), // La fecha se asigna aquí
      precioFinal: this.precioFinalCalculado
    };

    this.boletoService.addBoleto(nuevoBoleto);
    this.resetFormulario();
    alert('Boleto registrado con éxito!');
  }

  resetFormulario(): void {
     this.boleto = {

       dni: '',
       precioBase: undefined,
       categoriaTurista: undefined,
       email: ''
     };
     this.precioFinalCalculado = null;
     this.mostrarPrecioFinal = false;
   }

   onInputChanged(): void {
    this.calcularPrecioFinal();
   }
}
