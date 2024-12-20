import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pet-shop',
  imports: [
    RouterLink,
    NgIf
  ],
    templateUrl: './pet.component.html',
    styleUrl: './pet.component.css'
})
export class PetComponent {
  public pet: PetModel | null = null;

  constructor(private route: ActivatedRoute, private webService: WebService) {
    route.params.subscribe((params) => {
      const id = params['id'];
      this.webService.getPetById(id).subscribe((rsp) => {
        this.pet = rsp
        console.log(this.pet);
      });
    });
  }
}
