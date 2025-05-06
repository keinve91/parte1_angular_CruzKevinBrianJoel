import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para pipes y directivas
import { Subscription } from 'rxjs';
import { Boleto, CategoriaTurista } from '../../models/boleto';
import { BoletoService } from '../../services/boleto.service';

@Component({
  selector: 'app-resumen-ventas',
  standalone: true,
  imports: [CommonModule], // Importar CommonModule
  templateUrl: './resumen-ventas.component.html',
  styleUrls: ['./resumen-ventas.component.css']
})

export class ResumenVentasComponent implements OnInit, OnDestroy {
  countMenor: number = 0;
  countAdulto: number = 0;
  countJubilado: number = 0;
  totalGeneral: number = 0;
  totalBoletos: number = 0;

  private boletosSubscription: Subscription | null = null;
  private boletoService = inject(BoletoService);



  ngOnInit(): void {
    this.boletosSubscription = this.boletoService.boletos$.subscribe(
      (boletos) => {
        this.calcularResumen(boletos);
        console.log('ResumenVentasComponent recibió actualización:', boletos);
      }
    );
  }



  ngOnDestroy(): void {
    this.boletosSubscription?.unsubscribe();
  }
  calcularResumen(boletos: Boleto[]): void {
    // Reiniciar contadores
    this.countMenor = 0;
    this.countAdulto = 0;
    this.countJubilado = 0;
    this.totalGeneral = 0;
    this.totalBoletos = boletos.length;
    // Calcular
    boletos.forEach(boleto => {
    switch (boleto.categoriaTurista) {
        case CategoriaTurista.Menor:
          this.countMenor++;
          break;
        case CategoriaTurista.Adulto:
          this.countAdulto++;
          break;
        case CategoriaTurista.Jubilado:
          this.countJubilado++;
          break;
      }
      // Sumar al total general (asegurándose de que precioFinal exista)
      this.totalGeneral += boleto.precioFinal ?? 0;
    });
}
}