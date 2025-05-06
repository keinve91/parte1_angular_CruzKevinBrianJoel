import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngFor, ngIf, DatePipe, CurrencyPipe
import { Subscription } from 'rxjs';
import { Boleto, CategoriaTurista } from '../../models/boleto';
import { BoletoService } from '../../services/boleto.service';

@Component({
  selector: 'app-lista-boletos',
  standalone: true,
  imports: [CommonModule], // Importar CommonModule
  templateUrl: './lista-boletos.component.html',
  styleUrls: ['./lista-boletos.component.css']
})

export class ListaBoletosComponent implements OnInit, OnDestroy {
  boletos: Boleto[] = [];
  private boletosSubscription: Subscription | null = null;
  private boletoService = inject(BoletoService);
  // Mapeo para mostrar nombres de categoría

  mapaCategorias: { [key: number]: string } = {
      [CategoriaTurista.Menor]: 'Menor',
      [CategoriaTurista.Adulto]: 'Adulto',
      [CategoriaTurista.Jubilado]: 'Jubilado'
  };

  ngOnInit(): void {
    // Suscribirse a los cambios en la lista de boletos del servicio
    this.boletosSubscription = this.boletoService.boletos$.subscribe(
      (boletosRecibidos) => {
        this.boletos = boletosRecibidos;
        console.log('ListaBoletosComponent recibió actualización:', this.boletos);
      }
    );
  }



  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.boletosSubscription?.unsubscribe();
  }
  // Función para obtener el texto de la categoría
  getCategoriaTexto(categoriaId: number): string {
    return this.mapaCategorias[categoriaId] || 'Desconocida';
  }
}
