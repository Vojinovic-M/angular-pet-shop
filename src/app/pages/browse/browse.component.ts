import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebService } from '../../services/web.service';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import {NgFor, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLink, NgFor, NgOptimizedImage],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {
  public webService!: WebService;
  public data: PageModel<PetModel> | null = null;

  constructor(webService: WebService) {
    this.webService = webService;
    this.getPetData();
  }

  public getPetData(page = 0) {
    this.webService.getPets(page).subscribe(
      (data) => {this.data = data;},
      (error) => {console.log('Error fetching pets: ', error);}
    )
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

  ngOnInit(): void {
  }
}
