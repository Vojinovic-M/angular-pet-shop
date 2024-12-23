import {Component, OnInit} from '@angular/core';
import { CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-shipping',
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent implements OnInit {
  constructor(private cartService: CartService) {
  }
  shippingCosts!: Observable<{type: string, price: number}[]>;
  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }
}
