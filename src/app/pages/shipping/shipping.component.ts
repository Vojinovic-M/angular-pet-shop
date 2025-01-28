import {Component, OnInit} from '@angular/core';
import { CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatExpansionPanelActionRow} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';

/**
 * ShippingComponent is responsible for displaying the available shipping options.
 * The shipping options are retrieved from a service and displayed as a list.
 */
@Component({
  selector: 'app-shipping',
  imports: [
    AsyncPipe,
    NgForOf,
    MatCardContent,
    MatExpansionPanelActionRow,
    MatCard,
    MatCardHeader,
    MatIcon
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent implements OnInit {

  // Observable to store the shipping costs retrieved from the service
  shippingCosts!: Observable<{type: string, price: number}[]>;

  constructor(private cartService: CartService) {}

  /**
   * Lifecycle hook to initialize the component and fetch the shipping costs.
   */
  ngOnInit(): void {
    // Fetch the shipping prices using the CartService
    this.shippingCosts = this.cartService.getShippingPrices();
  }
}
