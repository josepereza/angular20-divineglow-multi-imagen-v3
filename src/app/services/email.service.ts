import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importamos los modelos que necesitamos

import { CustomerInfo } from './cart';
import { LineaPedido } from '../interfaces/pedido';
import { Product } from '../interfaces/product';

// Creamos una interfaz para el payload por claridad
export interface ConfirmationPayload {
  customerInfo: CustomerInfo;
  cartItems: Product[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3001';
  //private backendUrl = '/api3/';

  // El método ahora acepta el payload completo
  sendConfirmationEmail(payload: ConfirmationPayload): Observable<any> {
    console.log('email.service',payload)
    return this.http.post(`${this.backendUrl}/send-confirmacion`, payload);
  }
}