import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebService } from '../../services/web.service';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import {NgFor} from '@angular/common';
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

@Component({
    selector: 'app-browse',
  imports: [RouterLink, RouterLink, NgFor, MatPaginator, MatCard, MatCardHeader, MatCardImage, MatCardActions, MatCardTitle, FormsModule],
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

  constructor(private webService: WebService) {}

  /**
   * Angular lifecycle hook to load pets on component initialization.
   */
  ngOnInit() {
    this.loadPets();
  }

  /**
   * Fetches paginated pet data from the backend and updates the local state.
   */
  loadPets() {
    this.webService.getPets(this.currentPage).subscribe((data) => {
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
}
