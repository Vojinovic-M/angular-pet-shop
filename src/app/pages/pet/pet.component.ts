import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../../models/pet.model';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {MatList, MatListItem} from '@angular/material/list';
import {animate, style, transition, trigger} from '@angular/animations';
import {OrderService} from '../../services/order.service';
import {PetService} from '../../services/pet.service';

@Component({
    selector: 'app-pet-shop',
  imports: [
    RouterLink,
    NgIf,
    MatList,
    MatListItem,
    NgForOf,
  ],
    templateUrl: './pet.component.html',
    styleUrl: './pet.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),]
})
export class PetComponent implements OnInit {
  public pet: PetModel | null = null; // Stores the details of the current pet.
  ratings: { email: string; rating: number }[] = [];


  constructor(
    private route: ActivatedRoute, // Provides access to route parameters.
    private petService: PetService, // Service to fetch pet data.
    private cartService: CartService, // Service for managing the shopping cart.
    private orderService: OrderService, // Service for fetching order-related data
  ) {}

  ngOnInit() {
    // Fetch pet by ID from the route params
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.petService.getPetById(id).subscribe((petModel) => {
        if (petModel) {
          this.pet = petModel;
          console.log(this.pet);
          this.fetchRatings(petModel.id)
        } else {
          console.error('Pet data is null or undefined.');
        }
      });
    });
  }

  /**
   * Fetch ratings for the pet by its ID
   * @param petId - The ID of the pet to fetch ratings for
   */
  private fetchRatings(petId: number) {
    this.orderService.getRatingsByPetId(petId).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.ratings = data;
        } else {
          console.log('No ratings available: ', data)
        }
      },
      error: (error) => {
        console.error('Failed to load pet ratings : ',error);
      }
    });
  }


  /**
   * Adds the current pet to the cart.
   * @param pet - The pet to add.
   */
  addToCart(pet: PetModel) {
    this.cartService.addToCart(pet);
    alert('Added to cart!');
  }
}
