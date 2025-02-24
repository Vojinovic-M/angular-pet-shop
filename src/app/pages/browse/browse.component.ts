import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import { PetDistanceModel } from '../../../models/pet-distance.model';
import {CommonModule, NgFor} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {PetService} from '../../services/pet.service';

@Component({
    selector: 'app-browse',
  imports: [
    RouterLink,
    NgFor,
    MatPaginator,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardActions,
    MatCardTitle,
    FormsModule,
    CommonModule
  ],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  ]
})
export class BrowseComponent implements OnInit {
  public data: PageModel<PetModel> = {
    content: [],
    pageable: {
      sort: { sorted: false, empty: true, unsorted: true },
      pageNumber: 0,
      pageSize: 0,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 0,
    totalElements: 0,
    last: true,
    size: 0,
    number: 0,
    sort: { sorted: false, empty: true, unsorted: true },
    numberOfElements: 0,
    first: true,
    empty: true,
  };
  public pageSize = 10; // Number of pets per page.
  public currentPage = 0;  // Current page index.
  public totalElements = 0;  // Total number of pets in the database.

  filteredPets: PetModel[] = []; // Pets filtered by search term.
  searchTerm: string = ''; // Search input value.
  petsWithDistance: PetDistanceModel[] = []; // Pets filtered by distance from user
  petsNearby: PetDistanceModel[] = [];

  constructor(private readonly petService: PetService) {}

  /**
   * Angular lifecycle hook to load pets on component initialization.
   */
  ngOnInit() {
    this.loadPets();
    this.getUserLocationAndLoadCarousel();
  }

  /**
   * Fetches paginated pet data from the backend and updates the local state.
   */
  loadPets() {
    this.petService.getPets(this.currentPage).subscribe((data) => {
      this.data = data;
      this.totalElements = data.totalElements;
      this.filteredPets = data.content;
    })
  }

  /**
   * Updates the current page and reloads pet data on pagination change.
   * @param event - The pagination event containing the new page index and size.
   */
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPets();
  }

  /**
   * Filters pets based on the search term.
   */
  applySearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPets = this.data.content.filter((pet) =>
      pet.name.toLowerCase().includes(term) ||
      pet.breed.toLowerCase().includes(term)
      // || pet.description.toLowerCase().includes(term)
    );
  }

  getUserLocationAndLoadCarousel() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.petService.getPetsWithDistance(lat, lng).subscribe((pets) => {
            this.petsWithDistance = pets;
            this.petsNearby = pets.filter(p => p.distance <= 150);
          });
        },
        (err) => {
          console.log('Error getting geolocation: ', err);
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser!');
    }
  }
}
