import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Boleto } from '../models/boleto';

@Injectable({
  providedIn: 'root' // Servicio disponible en toda la aplicación
})
export class BoletoService {
  private boletosSubject: BehaviorSubject<Boleto[]> = new BehaviorSubject<Boleto[]>([]);

  public boletos$: Observable<Boleto[]> = this.boletosSubject.asObservable();
  constructor() {
  }
  // Obtiene la lista actual de boletos (snapshot)

  getBoletosSnapshot(): Boleto[] {
    return this.boletosSubject.getValue();
  }
  addBoleto(boleto: Boleto): void {
    const currentBoletos = this.boletosSubject.getValue();
    boleto.fechaCompra = new Date();
    const updatedBoletos = [...currentBoletos, boleto];
    this.boletosSubject.next(updatedBoletos); // Emite la nueva lista
    console.log('Boleto registrado:', boleto);
    console.log('Lista actualizada:', updatedBoletos);

  }

}
