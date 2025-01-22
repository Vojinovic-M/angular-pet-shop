import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthGoogleService} from '../../../services/auth-google.service';
import {AuthUserService} from '../../../services/auth-user.service';
import {OrderComponent} from '../../order/order.component';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../../../models/order.model';


@Component({
    selector: 'app-dashboard',
  imports: [CommonModule, OrderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private authGoogleService = inject(AuthGoogleService);
  private authUserService = inject(AuthUserService);
  private router = inject(Router);
  orders: Order[] = [];
  userProfile = this.authUserService.getUserProfile();
  googleProfile = this.authGoogleService.getGoogleProfile()();


  constructor(private http: HttpClient) {}

  logOut() {
    this.authGoogleService.logout();
    this.authUserService.logout();
    this.router.navigate(['/user/login']);
  }

  ngOnInit() {
    this.fetchOrders();
  }

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

}
