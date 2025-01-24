import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';
import { NgIf } from '@angular/common';
import {CartService} from '../../services/cart.service';
import {MatList, MatListItem} from '@angular/material/list';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-pet-shop',
  imports: [
    RouterLink,
    NgIf,
    MatList,
    MatListItem,
  ],
    templateUrl: './pet.component.html',
    styleUrl: './pet.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class PetComponent implements OnInit {
  public pet: PetModel | null = null;

  constructor(private route: ActivatedRoute,
              private webService: WebService,
              private cartService: CartService)
  {
    route.params.subscribe((params) => {
      const id = params['id'];
      this.webService.getPetById(id).subscribe((rsp) => {
        this.pet = rsp
        console.log(this.pet);
      });
    });
  }

  addToCart(pet: PetModel) {
    this.cartService.addToCart(pet);
    alert('Added to cart!');
  }

  ngOnInit(): void {
  }
}
