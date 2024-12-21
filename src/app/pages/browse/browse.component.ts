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

@Component({
    selector: 'app-browse',
  imports: [RouterLink, NgIf, RouterLink, NgFor, NgOptimizedImage, MatPaginator, MatCard, MatCardHeader, MatCardImage, MatCardContent, MatCardActions, MatAnchor, MatCardTitle],
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


  constructor(private webService: WebService) {}

  ngOnInit(): void {
    this.getPetData(this.currentPage)
  }

  public getPetData(page: number = 0): void {
    this.webService.getPets(page).subscribe(
      (data) => {
        this.data = data;
        this.currentPage = data.pageable.pageNumber;
        this.totalElements = data.totalElements;
        },
      (error) => {console.log('Error fetching pets: ', error);}
    )
  }

  public onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.getPetData(pageIndex);
  }
  // KORISTI ZA JSON
  // public getPetData(page = 0) {
  //   this.webService.getPets(page).subscribe(
  //     (data) => {this.data = data},
  //     (error) => {
  //       console.log('Error fetching pets: ', error);
  //     });
  // }

  public first(): void {
    this.getPetData(0); // Always fetch the first page
  }

  public previous(): void {
    if (this.data && !this.data.first) {
      this.getPetData(this.data.pageable.pageNumber - 1);
    }
  }

  public next(): void {
    if (this.data && !this.data.last) {
      this.getPetData(this.data.pageable.pageNumber + 1);
    }
  }

  public last(): void {
    if (this.data) {
      this.getPetData(this.data.totalPages - 1); // Fetch the last page
    }
  }
}
