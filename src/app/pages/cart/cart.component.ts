import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PetModel } from '../../../models/pet.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {MatButton} from '@angular/material/button';
import {AuthUserService} from '../../services/auth-user.service';
import {AuthGoogleService} from '../../services/auth-google.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: PetModel[] = [];

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private authUserService: AuthUserService,
              private authGoogleService: AuthGoogleService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.items = this.cartService.getItems();
  }

  placeOrder() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      alert('You need to log in to place an order!');
      return;
    }

    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    this.items.forEach((item) => {
      const order = {
        petId: item.id,
        userId: this.getUserId(),
      };

    this.orderService.createOrder(order, authHeader).subscribe(
      (response) => {
        alert(`${item.name} order has been successfully created!`);
        this.removeItem(this.items.indexOf(item));
      },
      (error) => {
        console.error('Error placing order: ', error);
        alert('Failed to place order. Please try again later.');
      }
    );
    })
  }

  private getUserId(): number | string | null {
    const authUser = this.authUserService.getUserProfile();
    const googleUser = this.authGoogleService.getGoogleProfile()();

    console.log('Auth User:', authUser);
    console.log('Google User:', googleUser);

    if (authUser) {
      return authUser.id;
    } else if (googleUser) {
      return googleUser.sub;
    }
    return null;
}
}
