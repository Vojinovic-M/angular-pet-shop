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
}
