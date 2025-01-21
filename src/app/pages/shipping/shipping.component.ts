import {Component, OnInit} from '@angular/core';
import { CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatHeaderRow} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup} from '@angular/material/card';
import {MatExpansionPanelActionRow} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';

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

  constructor(private cartService: CartService) {}

  shippingCosts!: Observable<{type: string, price: number}[]>;

  ngOnInit(): void { this.shippingCosts = this.cartService.getShippingPrices(); }

}
