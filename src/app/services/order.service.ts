import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: any, authHeader: string): Observable<any> {
    const headers = { Authorization: authHeader};
    return this.http.post(`${this.baseUrl}/create`, order, { headers });
  }

  getOrders(): Observable<Order[]> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return this.http.get<Order[]>(`${this.baseUrl}`, {
      headers: new HttpHeaders().set('Authorization', authHeader),
    });
  }

  updateOrderStatus(orderId: number, status: string): Observable<void> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return this.http.put<void>(`${this.baseUrl}/${orderId}/status`, {status},
      {
      headers: new HttpHeaders()
        .set('Authorization', authHeader)
        .set( 'Content-Type', 'application/json' )
    });
  }

  cancelOrder(orderId: number): Observable<void> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return this.http.put<void>(`${this.baseUrl}/${orderId}/cancel`, {}, {
      headers: new HttpHeaders().set('Authorization', authHeader),
    });
  }


  rateOrder(orderId: number, rating: number): Observable<void> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    });

    return this.http.post<void>(`${this.baseUrl}/${orderId}/rating`, { rating }, { headers, responseType: 'text' as 'json' });
  }


}
