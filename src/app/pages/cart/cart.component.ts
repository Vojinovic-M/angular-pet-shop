import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PetModel } from '../../../models/pet.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {AuthUserService} from '../../services/auth-user.service';
import {AuthGoogleService} from '../../services/auth-google.service';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

/**
 * CartComponent displays the shopping cart contents and allows users to manage their cart.
 * Users can view items, calculate the total price, remove items, clear the cart, and place orders.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class CartComponent implements OnInit {
  // Array to store the items in the cart
  items: PetModel[] = [];

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private authUserService: AuthUserService,
              private authGoogleService: AuthGoogleService) {}

  /**
   * Lifecycle hook to initialize the cart by fetching items from CartService.
   */
  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  /**
   * Calculates the total price of all items in the cart.
   * @returns The total price of the cart.
   */
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  /**
   * Clears all items from the cart and updates the local data.
   */
  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  /**
   * Removes a specific item from the cart based on its index.
   * Updates the cart data after removal.
   * @param index The index of the item to be removed.
   */
  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.items = this.cartService.getItems();
  }

  /**
   * Places orders for all items currently in the cart.
   * Uses authentication credentials to send the orders to the backend.
   * Each successfully placed order removes the corresponding item from the cart.
   */
  placeOrder(): void {
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
        () => {
          alert(`${item.name} order has been successfully created!`);
          this.removeItem(this.items.indexOf(item));
        },
        (error) => {
          console.error('Error placing order: ', error);
          alert('Failed to place order. Please try again later.');
        }
      );
    });
  }

  /**
   * Retrieves the user's ID, either from the regular profile or Google profile.
   * @returns The user's ID, or null if no user is logged in.
   */
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
