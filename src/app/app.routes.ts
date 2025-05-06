// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Asegúrate que las rutas de importación sean correctas para tu estructura de carpetas
import { Punto1Component } from './punto1/punto1.component';
import { Punto2Component } from './punto2/punto2.component';
import { Punto3Component } from './punto3/punto3.component';
import { FormularioBoletoComponent } from './components/formulario-boleto/formulario-boleto.component';

export const routes: Routes = [
    { path: 'punto1', component: Punto1Component },
    { path: 'punto2', component: Punto2Component },
    { path: 'punto3', component: Punto3Component },
    { path: 'boletos', component: FormularioBoletoComponent },


    // Ruta por defecto: redirige a 'punto1' cuando la URL esté vacía
    { path: '', redirectTo: '/punto1', pathMatch: 'full' },
    // Ruta comodín opcional para manejar URLs no encontradas
    { path: '**', redirectTo: '/punto1' } // O redirige a una página 404 si la creas
];