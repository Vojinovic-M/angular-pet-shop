import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {AuthUserService} from '../../../services/auth-user.service';
import {OrderComponent} from '../../order/order.component';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../../../models/order.model';
import {animate, style, transition, trigger} from '@angular/animations';

/**
 * DashboardComponent is the main hub for logged-in users.
 * It displays the user's orders and allows them to log out.
 */
@Component({
    selector: 'app-dashboard',
  imports: [CommonModule, OrderComponent, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  // Services for authentication and routing
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router = inject(Router);

  // Array to store the user's orders
  orders: Order[] = [];

  // Profiles for regular and Google accounts
  userProfile = this.authUserService.getUserProfile();
  googleProfile = this.authGoogleService.getGoogleProfile()();


  constructor(private http: HttpClient) {}

  /**
   * Logs the user out of both Google and regular accounts.
   * Redirects to the login page after logout.
   */
  logOut() {
    this.authGoogleService.logout();
    this.authUserService.logout();
    this.router.navigate(['/user/login']);
  }


  /**
   * Fetches all orders for the logged-in user from the backend.
   */
  fetchOrders() {
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    this.http.get<Order[]>('http://localhost:8080/orders', {
      headers: {Authorization: authHeader},
    }).subscribe({
      next: (data) => {
        console.log('Orders fetched successfully: ',data);
        this.orders = data
      },
      error: (error) => {
        console.error('Failed to fetch orders', error)
        if (error.status === 401) {
          alert('Unauthorized. Please log in again.');
        }
      }
    });
  }

  /**
   * Initializes the component by fetching user orders.
   */
  ngOnInit() {
    this.fetchOrders();
  }

}
