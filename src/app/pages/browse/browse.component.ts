import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebService } from '../../services/web.service';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import {NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatAnchor} from '@angular/material/button';
import {SearchComponent} from '../../components/search/search.component';
import {FormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';

@Component({
    selector: 'app-browse',
  imports: [RouterLink, NgIf, RouterLink, NgFor, NgOptimizedImage, MatPaginator, MatCard, MatCardHeader, MatCardImage, MatCardActions, MatAnchor, MatCardTitle, FormsModule, MatDivider],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.css'
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
  public pageSize = 10;
  public currentPage = 0;
  public totalElements = 0;

  filteredPets: PetModel[] = [];
  searchTerm: string = '';

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.webService.getPets(this.currentPage).subscribe((data) => {
      this.data = data;
      this.totalElements = data.totalElements;
      this.filteredPets = data.content;
    })
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPets();
  }

  applySearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPets = this.data.content.filter((pet) =>
      pet.name.toLowerCase().includes(term) || pet.breed.toLowerCase().includes(term)
    );
  }


  // KORISTI ZA JSON
  // public getPetData(page = 0) {
  //   this.webService.getPets(page).subscribe(
  //     (data) => {this.data = data},
  //     (error) => {
  //       console.log('Error fetching pets: ', error);
  //     });
  // }
}
