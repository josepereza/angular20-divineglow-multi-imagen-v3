import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private ordersSignal = signal<CreatePedido[]>([]);
  orderSignal = signal<CreatePedido>({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    lineas: []
  });

  orders = this.ordersSignal.asReadonly();
//  private apiUrl = 'http://localhost:3002/pedidos'; 
    private apiUrl = '/api2/pedidos'; 


  constructor(private http: HttpClient) {
        this.loadOrders();

   }
loadOrders() {
    this.http.get<CreatePedido[]>(this.apiUrl).subscribe({
      next: (data) => this.ordersSignal.set(data),
      error: (err) => console.error('Error cargando pedidos', err)
    });
  }
  createPedido(pedidoData: CreatePedido): Observable<any> {
    console.log('pedido service',pedidoData)
    return this.http.post<any>(this.apiUrl, pedidoData)
  }
  updateGesendet(id: number, gesendet: boolean) {
    return this.http.patch(`${this.apiUrl}/${id}`, { gesendet });
  }
}
