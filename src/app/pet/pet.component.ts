import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../models/pet.model';
import { WebService } from '../web.service';
import { NgIf } from '@angular/common';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-pet-shop',
  standalone: true,
  imports: [ RouterLink, NgIf, SafePipe],
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
