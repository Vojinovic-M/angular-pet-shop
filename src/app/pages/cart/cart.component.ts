import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PetModel } from '../../../models/pet.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: PetModel[] = [];

  constructor(private cartService: CartService,
              private orderService: OrderService) {}

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

  placeOrder(item: any) {
    const userId = 1; //popravi ovo
    this.items.forEach((item) => {
      const order = {
        petId: item.id,
        userId: userId
      };

    this.orderService.createOrder(order).subscribe(
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
}
