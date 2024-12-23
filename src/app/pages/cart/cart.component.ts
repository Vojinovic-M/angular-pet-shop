import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PetModel } from '../../../models/pet.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

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

  constructor(private cartService: CartService) {}

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
}
