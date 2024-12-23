import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';
import { NgIf } from '@angular/common';
import {CartService} from '../../services/cart.service';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {window} from 'rxjs';

@Component({
    selector: 'app-pet-shop',
  imports: [
    RouterLink,
    NgIf,
    MatButton,
    MatCard,
    MatList,
    MatListItem,
    MatIcon
  ],
    templateUrl: './pet.component.html',
    styleUrl: './pet.component.css'
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
