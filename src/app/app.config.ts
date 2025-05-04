// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router'; // Importa provideRouter y opcionalmente withComponentInputBinding

import { routes } from './app.routes'; // Importa tus rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Aquí es donde registras las rutas en tu aplicación
    provideRouter(routes, withComponentInputBinding()) // withComponentInputBinding permite pasar datos de la ruta como @Inputs
  ]
};