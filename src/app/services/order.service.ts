import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, order);
  }

  getOrders(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${orderId}/status`, status, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
