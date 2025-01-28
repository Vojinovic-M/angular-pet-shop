import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders'; // Base URL (Tomcat) for order-related API endpoints.

  constructor(private http: HttpClient) { }

  /**
   * Creates a new order by sending a POST request to the backend.
   * @param order The order object to be created.
   * @param authHeader The Basic Authentication header value.
   * @returns An observable of the created order.
   */
  createOrder(order: any, authHeader: string): Observable<any> {
    const headers = { Authorization: authHeader};
    return this.http.post(`${this.baseUrl}/create`, order, { headers });
  }

  /**
   * Retrieves all orders for the currently logged-in user.
   * @returns An observable of the list of orders.
   */
  getOrders(): Observable<Order[]> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return this.http.get<Order[]>(`${this.baseUrl}`, {
      headers: new HttpHeaders().set('Authorization', authHeader),
    });
  }

  /**
   * Updates the status of a specific order.
   * @param orderId The ID of the order to update.
   * @param status The new status to set (e.g., "COMPLETED").
   * @returns An observable indicating the result of the operation.
   */
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

  /**
   * Cancels a specific order.
   * @param orderId The ID of the order to cancel.
   * @returns An observable indicating the result of the operation.
   */
  cancelOrder(orderId: number): Observable<void> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    return this.http.put<void>(`${this.baseUrl}/${orderId}/cancel`, {}, {
      headers: new HttpHeaders().set('Authorization', authHeader),
    });
  }

  /**
   * Rates an order by submitting a POST request with the rating.
   * @param orderId The ID of the order to rate.
   * @param rating The rating value (e.g., 1–5 stars).
   * @returns An observable indicating the result of the operation.
   */
  rateOrder(orderId: number, rating: number): Observable<void> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    });

    return this.http.post<void>(`${this.baseUrl}/${orderId}/rating`,
      { rating },
      { headers, responseType: 'text' as 'json' });
  }

  /**
   * Fetches ratings for a specific pet by pet ID.
   * @param petId The ID of the pet.
   * @returns An observable containing the ratings.
   */
  getRatingsByPetId(petId: number): Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/${petId}/ratings` );
  }


}
