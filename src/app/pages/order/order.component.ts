import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthUserService } from '../../services/auth-user.service';
import { AuthGoogleService } from '../../services/auth-google.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../../models/order.model';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatHeaderRow} from '@angular/material/table';
import {MatList} from '@angular/material/list';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  imports: [
    MatButton,
    NgIf,
    NgForOf,
    MatCard,
    MatHeaderRow,
    MatList,
    MatCardContent,
    MatCardImage
  ],
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: Order[] = [];

  constructor(
    private authUserService: AuthUserService,
    private authGoogleService: AuthGoogleService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}


  private getUserId(): number | string {
    const regularUser = this.authUserService.getUserProfile();
    const googleUser = this.authGoogleService.getGoogleProfile()();

    if (regularUser?.id) {
      return regularUser.id;
    } else if (googleUser?.sub) {
      return googleUser.sub;
    }
    throw new Error('User ID is not available. Cannot load orders.');
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data: any[]) => {
        this.orders = data.map(order => ({
          id: order.id,
          status: order.status,
          pet: order.pet,
          price: order.pet.price,
          createdAt: new Date(order.createdAt),
        }));
        console.log('Orders loaded:', this.orders);
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.snackBar.open('Failed to load orders.', 'Ok', { duration: 3000 });
      }
    });
  }

  changeStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.snackBar.open('Order status updated successfully.', 'Ok', { duration: 3000 });
        this.loadOrders();
      },
      error: () => {
        this.snackBar.open('Order status update failed.', 'Ok', { duration: 3000 });
      }
    });
  }
}
