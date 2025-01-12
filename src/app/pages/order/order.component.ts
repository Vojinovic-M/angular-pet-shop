import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CommonModule} from '@angular/common';
import {AuthUserService} from '../../services/auth-user.service';
import {AuthGoogleService} from '../../services/auth-google.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private authUserService: AuthUserService,
              private authGoogleService: AuthGoogleService,
              private orderService: OrderService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userId = this.authUserService.getUserProfile() && this.authGoogleService.getGoogleProfile();
  this.loadOrders()
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    })
  }

  loadUserOrders(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe((data) => {
      this.orders = data;
    })
  }

  changeStatus(orderId: number, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.snackBar.open('Order status updated successfully.', 'Ok', {duration: 3000 });
        this.loadOrders();
      }, error: () => {
        this.snackBar.open('Order status updated failed', 'Ok', {duration: 3000 });
      }
    })
  }
}
