import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PetModel} from '../../../models/pet.model';
import {NgForOf} from '@angular/common';
import {PetService} from '../../services/pet.service';

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

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets(0).subscribe((data) => {
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
