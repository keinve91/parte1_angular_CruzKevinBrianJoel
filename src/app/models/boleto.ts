export interface Boleto {
      dni: string;
      precioBase: number;
      categoriaTurista: number; // 1: Menor, 2: Adulto, 3: Jubilado
      fechaCompra: Date;
      email: string;
      precioFinal?: number;
}
    
export enum CategoriaTurista {
      Menor = 1,
      Adulto = 2,
      Jubilado = 3
}
    