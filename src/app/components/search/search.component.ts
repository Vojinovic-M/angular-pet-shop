import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PetModel} from '../../../models/pet.model';
import {WebService} from '../../services/web.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  pets: PetModel[] = [];
  filteredPets: PetModel[] = [];

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.webService.getPets(0).subscribe((data) => {
      this.pets = data.content;
      this.filteredPets = this.pets;
    })
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPets = this.pets.filter((pet) =>
      pet.name.toLowerCase().includes(term)
    );
  }
}
